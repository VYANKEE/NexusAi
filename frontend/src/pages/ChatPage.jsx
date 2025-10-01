import React, { useState, useEffect, useRef } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { getSessionById, sendMessage } from '../api/session.js';
import { FiSend } from 'react-icons/fi'; // Import an icon for sending

const ChatPage = () => {
  const { sessionId } = useParams();
  const { onSessionCreated } = useOutletContext(); // From AppLayout for session updates
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions = [
    { label: 'Fix grammar & spelling', prompt: 'Fix grammar and spelling in the last message.' },
    { label: 'Make this more concise', prompt: 'Make the last message more concise.' },
    { label: 'Write this more professionally', prompt: 'Rewrite the last message more professionally.' },
    { label: 'Make it sound more human', prompt: 'Make the last message sound more human.' },
    { label: 'Summarize the key points', prompt: 'Summarize the key points from the last message.' },
    { label: 'Continue writing from here', prompt: 'Continue writing from where the last message left off.' },
    { label: 'Suggest a title for this', prompt: 'Suggest a title for the content in this session.' },
    // You can add more suggestions here
  ];

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) return;
      setLoading(true);
      try {
        const response = await getSessionById(sessionId);
        setSession(response.data);
      } catch (error) {
        console.error("Failed to fetch session data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSessionData();
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [session?.messages, isThinking]);

  const handleSendMessage = async (messageContent) => {
    if (!messageContent.trim() || isThinking) return;

    const userMessage = { role: 'user', content: messageContent, timestamp: new Date().toISOString() };
    setSession(prev => ({ ...prev, messages: [...prev.messages, userMessage] }));
    
    setNewMessage(''); // Clear input after sending
    setIsThinking(true);

    try {
      const response = await sendMessage(sessionId, messageContent);
      setSession(response.data);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Revert the message if it failed or show an error
      setSession(prev => ({ ...prev, messages: prev.messages.slice(0, -1) }));
    } finally {
      setIsThinking(false);
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(newMessage);
  };

  const handleSuggestionClick = (prompt) => {
    handleSendMessage(prompt);
  };

  if (loading || !session) {
    return <div className="p-8 text-center text-gray-400">Loading session...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
        {session.messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Start typing or choose a suggestion to begin!
          </div>
        )}
        {session.messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl px-4 py-2 rounded-xl whitespace-pre-wrap ${message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
              <p>{message.content}</p>
              {/* Optional: display timestamp
              <span className="block text-xs text-right mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span> 
              */}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="max-w-xl px-4 py-2 rounded-xl bg-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="sticky bottom-0 bg-gray-900 p-4 border-t border-gray-700 flex flex-col items-center">
        {/* Suggestion Chips */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
          {suggestions.map((s, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(s.prompt)}
              className="flex items-center justify-center p-2 text-sm bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 transition-colors disabled:opacity-50"
              disabled={isThinking}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleInputSubmit} className="w-full max-w-4xl flex items-center space-x-3 bg-gray-800 rounded-xl border border-gray-700 p-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { // Send on Enter, new line on Shift+Enter
                e.preventDefault();
                handleInputSubmit(e);
              }
            }}
            disabled={isThinking}
            rows={1}
            style={{ maxHeight: '150px' }} // Limit textarea height
            className="flex-1 resize-none bg-transparent outline-none text-gray-100 placeholder-gray-400 px-2 py-1 overflow-y-auto custom-scrollbar"
            placeholder="Send a message..."
          ></textarea>
          <button
            type="submit"
            disabled={isThinking || !newMessage.trim()}
            className="p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;