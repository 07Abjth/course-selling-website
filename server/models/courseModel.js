import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Instructor linked to User model
    image: { type: String },  
    category: { type: String, required: true },  
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" }, // Course difficulty level
    duration: { type: String }, // Course duration (e.g., "10 hours total")
    totalLectures: { type: Number, default: 0 }, // Total lectures count
    language: { type: String, default: "English" }, // Course language
    rating: { type: Number, default: 0 }, // Average rating
    studentsEnrolled: { type: Number, default: 0 }, // Total enrolled students

    // ✅ What students will learn
    learningOutcomes: [{ type: String }],

    // ✅ Course syllabus (Sections & Lectures)
    syllabus: [
      {
        sectionTitle: { type: String, required: true },
        lectures: [
          {
            title: { type: String, required: true },
            videoUrl: { type: String }, // Video lecture URL
            duration: { type: String }, // Lecture duration (e.g., "10 mins")
            resources: [{ type: String }], // Additional resources (PDFs, links)
          },
        ],
      },
    ],

    // ✅ Course prerequisites
    prerequisites: [{ type: String }],

    // ✅ Reviews & ratings
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // ✅ Enrollment details
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who enrolled
    certificateAvailable: { type: Boolean, default: true }, // If the course offers a certificate

  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
