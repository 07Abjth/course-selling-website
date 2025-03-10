import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../../controllers/userControllers.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/profile', getUserProfile);  // Get profile (authenticated route)


export default router;
