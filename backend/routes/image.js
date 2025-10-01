import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createImageFromPrompt } from '../controllers/imageController.js';

const router = express.Router();

router.post('/generate', protect, createImageFromPrompt);

export default router;