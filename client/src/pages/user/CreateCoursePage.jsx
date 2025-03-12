import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance"; // ✅ Import Axios instance
import { useNavigate } from "react-router-dom";

export const CreateCoursePage = () => {
  const navigate = useNavigate(); // ✅ For redirection after creation

  // ✅ Define form state
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    instructor: "",
    image: "",
    category: "",
    level: "",
    duration: "",
    totalLectures: "",
    language: "",
    learningOutcomes: [],
    syllabus: [{ sectionTitle: "", lectures: [{ title: "", duration: "", videoUrl: "" }] }], // ✅ Added syllabus
    prerequisites: [],
    certificateAvailable: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // ✅ Handle array inputs (learning outcomes & prerequisites)
  const handleArrayChange = (e, field) => {
    setCourseData({ ...courseData, [field]: e.target.value.split(",") });
  };

  // ✅ Handle syllabus section changes
  const handleSyllabusChange = (index, field, value) => {
    const updatedSyllabus = [...courseData.syllabus];
    updatedSyllabus[index][field] = value;
    setCourseData({ ...courseData, syllabus: updatedSyllabus });
  };

  // ✅ Handle lecture changes inside syllabus
  const handleLectureChange = (sectionIndex, lectureIndex, field, value) => {
    const updatedSyllabus = [...courseData.syllabus];
    updatedSyllabus[sectionIndex].lectures[lectureIndex][field] = value;
    setCourseData({ ...courseData, syllabus: updatedSyllabus });
  };

  // ✅ Add new section
  const addSection = () => {
    setCourseData({
      ...courseData,
      syllabus: [...courseData.syllabus, { sectionTitle: "", lectures: [{ title: "", duration: "", videoUrl: "" }] }],
    });
  };

  // ✅ Remove a section
  const removeSection = (index) => {
    const updatedSyllabus = courseData.syllabus.filter((_, i) => i !== index);
    setCourseData({ ...courseData, syllabus: updatedSyllabus });
  };

  // ✅ Add new lecture inside a section
  const addLecture = (sectionIndex) => {
    const updatedSyllabus = [...courseData.syllabus];
    updatedSyllabus[sectionIndex].lectures.push({ title: "", duration: "", videoUrl: "" });
    setCourseData({ ...courseData, syllabus: updatedSyllabus });
  };

  // ✅ Remove a lecture inside a section
  const removeLecture = (sectionIndex, lectureIndex) => {
    const updatedSyllabus = [...courseData.syllabus];
    updatedSyllabus[sectionIndex].lectures = updatedSyllabus[sectionIndex].lectures.filter((_, i) => i !== lectureIndex);
    setCourseData({ ...courseData, syllabus: updatedSyllabus });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/courses/createCourse", courseData);
      if (response.data.success) {
        alert("Course created successfully!");
        navigate("/courses");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a New Course</h2>

        {/* ✅ Error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ Course Title */}
          <div>
            <label className="block font-semibold">Title</label>
            <input type="text" name="title" value={courseData.title} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          {/* ✅ Description */}
          <div>
            <label className="block font-semibold">Description</label>
            <textarea name="description" value={courseData.description} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
          </div>

          {/* ✅ Price */}
          <div>
            <label className="block font-semibold">Price (₹)</label>
            <input type="number" name="price" value={courseData.price} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          {/* ✅ Syllabus */}
          <div>
            <h2 className="text-xl font-semibold mt-6">Course Syllabus</h2>
            {courseData.syllabus.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border p-4 mt-4 rounded">
                <input
                  type="text"
                  placeholder="Section Title"
                  value={section.sectionTitle}
                  onChange={(e) => handleSyllabusChange(sectionIndex, "sectionTitle", e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button type="button" onClick={() => removeSection(sectionIndex)} className="text-red-500 mt-2">
                  Remove Section
                </button>

                {/* ✅ Lectures inside section */}
                {section.lectures.map((lecture, lectureIndex) => (
                  <div key={lectureIndex} className="ml-4 mt-2 border p-2 rounded">
                    <input
                      type="text"
                      placeholder="Lecture Title"
                      value={lecture.title}
                      onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, "title", e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g. 10 min)"
                      value={lecture.duration}
                      onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, "duration", e.target.value)}
                      className="w-full p-2 border rounded mt-2"
                    />
                    <input
                      type="text"
                      placeholder="Video URL"
                      value={lecture.videoUrl}
                      onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, "videoUrl", e.target.value)}
                      className="w-full p-2 border rounded mt-2"
                    />
                    <button type="button" onClick={() => removeLecture(sectionIndex, lectureIndex)} className="text-red-500 mt-2">
                      Remove Lecture
                    </button>
                  </div>
                ))}

                <button type="button" onClick={() => addLecture(sectionIndex)} className="text-blue-500 mt-2">
                  + Add Lecture
                </button>
              </div>
            ))}
            <button type="button" onClick={addSection} className="text-blue-500 mt-2">
              + Add Section
            </button>
          </div>

          {/* ✅ Submit Button */}
          <button type="submit" disabled={loading} className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
            {loading ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};
