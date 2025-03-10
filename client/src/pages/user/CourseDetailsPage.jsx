import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Get course ID from URL
import { axiosInstance } from "../../config/axiosInstance";

export const CourseDetailsPage = () => {
  const { id } = useParams(); // ✅ Extract course ID from URL
  const [course, setCourse] = useState(null);

  // Fetch full course details
  const fetchCourseDetails = async () => {
    try {
      const response = await axiosInstance.get(`/courses/${id}`);
      setCourse(response.data.course);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  if (!course) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6 md:p-10">
      {/* Course Header */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">{course.title}</h1>
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-60 object-cover rounded-md mt-4 shadow-md"
        />

        {/* Course Info Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-gray-700 space-y-2">
            <p><span className="font-semibold">Instructor:</span> {course.instructor}</p>
            <p><span className="font-semibold">Category:</span> {course.category}</p>
            <p><span className="font-semibold">Language:</span> {course.language}</p>
            <p><span className="font-semibold">Duration:</span> {course.duration}</p>
          </div>
          <div className="text-gray-700">
            <p className="text-xl font-bold text-blue-500">₹{course.price}</p>
            <p className="mt-2">{course.description}</p>
          </div>
        </div>

        {/* ✅ Course Syllabus */}
        {course.syllabus && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Course Syllabus</h2>
            <ul className="mt-3 space-y-4">
              {course.syllabus.map((section, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
                  <strong className="text-lg">{section.sectionTitle}</strong>
                  <ul className="mt-2 space-y-2">
                    {section.lectures.map((lecture, i) => (
                      <li key={i} className="text-gray-700">
                        <p className="font-semibold">{lecture.title}</p>
                        <p className="text-sm text-gray-500">Duration: {lecture.duration}</p>
                        <a
                          href={lecture.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Watch Video
                        </a>
                        {/* ✅ Display resources if available */}
                        {lecture.resources?.length > 0 && (
                          <ul className="list-disc ml-6 text-gray-500 text-sm">
                            {lecture.resources.map((res, j) => (
                              <li key={j}>{res}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ✅ Prerequisites */}
        {course.prerequisites && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Prerequisites</h2>
            <ul className="list-disc ml-6 text-gray-700 mt-3 space-y-2">
              {course.prerequisites.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ✅ Buttons for Enroll & Add to Cart */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <button className="flex-1 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
            Enroll Now
          </button>
          <button className="flex-1 px-6 py-3 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
