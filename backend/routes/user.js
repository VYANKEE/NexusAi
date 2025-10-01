import express from 'express';
// Make sure this import ends with .js
import { getUserProfile } from '../controllers/userController.js'; 
// Make sure this import also ends with .js
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Any request to this route must first pass through the `protect` middleware.
router.get('/me', protect, getUserProfile);

export default router;