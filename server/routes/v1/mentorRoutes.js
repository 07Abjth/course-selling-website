import express from "express";
import {
  checkMentor,
  getMentor,
  getMentorDashboard,
  getMentorProfile,
  loginMentor,
  logoutMentor,
  registerMentor,
} from "../../controllers/mentorControllers.js";
import { protectAndAuthorize } from "../../middlewares/authUtils.js";
import { mentorAuth } from "../../middlewares/mentorAuth.js";

const router = express.Router();

// ✅ Public Routes
router.post("/register", registerMentor);
router.post("/login", loginMentor);
router.post("/logout", logoutMentor);



router.post("/check-mentor",mentorAuth, checkMentor);
router.get("/get-mentor", getMentor);
router.get("/profile", getMentorProfile);
router.get("/dashboard", getMentorDashboard);

export default router;
