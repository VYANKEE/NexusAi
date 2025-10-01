import { videoJobQueue } from '../config/queue.js';
import VideoJob from '../models/VideoJob.js';

/**
 * @desc    Create and queue a new video generation job
 * @route   POST /api/video/jobs
 * @access  Private
 */
export const createVideoJob = async (req, res) => {
    const { prompt } = req.body;
    const userId = req.user._id;

    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required.' });
    }

    try {
        const job = await videoJobQueue.add('generate-video', {
            prompt,
            userId
        });

        const newVideoJob = await VideoJob.create({
            userId,
            prompt,
            bullJobId: job.id,
            status: 'queued',
        });

        res.status(201).json(newVideoJob);
    } catch (error) {
        console.error('Error creating video job:', error);
        res.status(500).json({ message: 'Server error while creating video job.' });
    }
};

/**
 * @desc    Get all video jobs for the logged-in user
 * @route   GET /api/video/jobs
 * @access  Private
 */
export const getUserVideoJobs = async (req, res) => {
    try {
        const jobs = await VideoJob.find({ userId: req.user._id }).sort({ createdAt: -1 });
        
        // FIX: Add this header to prevent browser caching
        res.setHeader('Cache-Control', 'no-store');
        
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching video jobs:', error);
        res.status(500).json({ message: 'Server error while fetching video jobs.' });
    }
};