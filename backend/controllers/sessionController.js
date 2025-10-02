import Session from '../models/Session.js';
import { generateText } from '../services/aiService.js';

/**
 * @desc    Create a new writing session
 * @route   POST /api/sessions
 * @access  Private
 */
export const createSession = async (req, res) => {
  try {
    const { title, initialPrompt } = req.body;
    const newSession = new Session({
      userId: req.user._id,
      title: title || 'New Writing Session',
    });
    if (initialPrompt) {
      newSession.messages.push({ role: 'user', content: initialPrompt });
    }
    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating session' });
  }
};

/**
 * @desc    Get all sessions for the logged-in user
 * @route   GET /api/sessions
 * @access  Private
 */
export const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching sessions' });
  }
};

/**
 * @desc    Get a single session by its ID
 * @route   GET /api/sessions/:id
 * @access  Private
 */
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session || session.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching session' });
  }
};

/**
 * @desc    Add a message to a session and get AI response
 * @route   POST /api/sessions/:id/messages
 * @access  Private
 */
// Replace the existing addMessageToSession function
export const addMessageToSession = async (req, res) => {
    try {
        console.log('[Controller] Received request to add message.');
        const { content } = req.body;
        const session = await Session.findById(req.params.id);

        if (!session || session.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Session not found' });
        }

        session.messages.push({ role: 'user', content });
        const history = session.messages.slice(0, -1);

        console.log('[Controller] Calling AI service...');
        const aiResponseText = await generateText(content, history);
        console.log('[Controller] AI service returned a response.');

        session.messages.push({ role: 'model', content: aiResponseText });

        console.log('[Controller] Saving session to database...');
        await session.save();
        console.log('[Controller] Session saved. Sending response to frontend.');
        
        res.status(200).json(session);
    } catch (error) {
        console.error('[Controller] An error occurred:', error);
        res.status(500).json({ message: 'Error processing message' });
    }
};

/**
 * @desc    Update a session's title
 * @route   PUT /api/sessions/:id
 * @access  Private
 */
export const updateSessionTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const session = await Session.findById(req.params.id);
    if (!session || session.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Session not found' });
    }
    session.title = title || 'Untitled Session';
    const updatedSession = await session.save();
    res.status(200).json(updatedSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating session' });
  }
};

/**
 * @desc    Delete a session
 * @route   DELETE /api/sessions/:id
 * @access  Private
 */
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session || session.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Session not found' });
    }
    await session.deleteOne();
    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting session' });
  }
};