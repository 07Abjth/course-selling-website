 import express from 'express';
import { registerMentor, loginMentor, getMentorDashboard } from '../../controllers/mentorControllers.js';
import { MentorAuth } from '../../middlewares/mentorAuth.js';

const router = express.Router();

// Route to register a new mentor
router.post('/register', registerMentor);

// Route for mentor login
router.post('/login', loginMentor);



// Protect the route with mentorAuth middleware and connect it to the controller
router.get('/mentor-dashboard', MentorAuth, getMentorDashboard);

export default router;
