import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createVideoJob, getUserVideoJobs } from '../controllers/videoController.js';

const router = express.Router();

router.route('/jobs')
  .post(protect, createVideoJob)
  .get(protect, getUserVideoJobs); // <-- ADD THIS .get()

export default router;