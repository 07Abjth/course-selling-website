import express from "express";
import { createCourse, deleteCourse, getAllCourses, getCourseById } from "../../controllers/courseController.js";
import { protectAndAuthorize } from "../../middlewares/authUtils.js";

const router = express.Router();

router.post("/createCourse", protectAndAuthorize("mentor"), createCourse);
router.get("/getCourses", getAllCourses);
router.get("/get-course-details/:id", getCourseById);
router.delete("/:id", protectAndAuthorize("admin"), deleteCourse);

export default router;
