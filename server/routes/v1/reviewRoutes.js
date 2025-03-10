import express from "express";
import { addReview, getCourseReviews } from "../../controllers/reviewController.js";

const router = express.Router();

router.post("/", addReview);
router.get("/:courseId", getCourseReviews);

export default router;
