import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile, checkUser } from '../../controllers/userControllers.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/check-user', protect, checkUser);
router.get('/profile', protect, getUserProfile);

export default router;
