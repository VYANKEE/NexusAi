import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  createSession, 
  getUserSessions, 
  getSessionById,
  addMessageToSession,
  updateSessionTitle,
  deleteSession 
} from '../controllers/sessionController.js';

const router = express.Router();

router.route('/')
  .post(protect, createSession)
  .get(protect, getUserSessions);

router.route('/:id')
  .get(protect, getSessionById)
  .put(protect, updateSessionTitle)
  .delete(protect, deleteSession);

router.route('/:id/messages').post(protect, addMessageToSession);

export default router;