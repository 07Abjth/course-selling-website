import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile, checkUser } from '../../controllers/userControllers.js';
import {authUser} from '../../middlewares/authUser.js';


const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

router.post('/login', loginUser);
router.get('/check-user/:id',authUser, checkUser)
router.post('/logout', logoutUser);

router.get('/profile', authUser, getUserProfile);  // Get profile (authenticated route)


export default router;
