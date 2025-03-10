import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Card } from "../../components/user/Card";
import { useNavigate } from "react-router-dom";

export const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/courses/getCourses"); // ✅ Fixed API call
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Our Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card 
              key={course._id} 
              id={course._id} // ✅ Pass ID for navigation
              title={course.title} 
              description={course.description} 
              image={course.image} 
              price={course.price} 
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No courses available.</p>
        )}
      </div>
    </div>
  );
};
