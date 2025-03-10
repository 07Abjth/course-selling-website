import Course from "../models/courseModel.js";
import mongoose from "mongoose";

 


// ✅ Create a new course
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      instructor,
      image,
      category,
      level,
      duration,
      totalLectures,
      language,
      learningOutcomes,
      syllabus,
      prerequisites,
      certificateAvailable,
    } = req.body;

    // ✅ Create new course document
    const newCourse = new Course({
      title,
      description,
      price,
      instructor,
      image,
      category,
      level,
      duration,
      totalLectures,
      language,
      learningOutcomes,
      syllabus,
      prerequisites,
      certificateAvailable,
    });

    await newCourse.save();

    res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// ✅ Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    if (!courses.length>0) {
      return res.status(404).json({ success: false, message: "No courses found" });
    }

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// ✅ Get a single course by ID with error handling
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

 
// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the course by ID and delete it
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, message: "Course deleted successfully", course: deletedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
