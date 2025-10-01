import express from 'express';
import { signup, login } from '../controllers/authController.js';
// We will add validation middleware later, for now we keep it simple

const router = express.Router();

// @route   POST api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', signup);

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', login);

// We'll implement these later
// router.post('/refresh', ...);
// router.get('/verify-email', ...);

export default router;