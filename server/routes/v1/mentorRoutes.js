import express from "express";
 
import { mentorAuth } from "../middleware/authMiddleware.js"; // ✅ Auth middleware
import { getMentorDashboard, getMentorProfile, loginMentor, logoutMentor, registerMentor } from "../../controllers/mentorControllers.js";

const router = express.Router();

// ✅ Register a new mentor
router.post("/register", registerMentor);

// ✅ Login mentor
router.post("/login", loginMentor);

// ✅ Logout mentor
router.post("/logout", logoutMentor);

// ✅ Get mentor profile (Protected Route)
router.get("/profile", mentorAuth, getMentorProfile);

// ✅ Get mentor dashboard (Protected Route)
router.get("/dashboard", mentorAuth, getMentorDashboard);

export default router;
