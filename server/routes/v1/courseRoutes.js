import express from "express";
import { createCourse, deleteCourse, getAllCourses, getCourseById } from "../../controllers/courseController.js";

const router = express.Router();

router.post("/createCourse", createCourse);
router.get("/getCourses", getAllCourses);
router.get("/:id", getCourseById);
router.delete("/:id", deleteCourse);

export default router;
