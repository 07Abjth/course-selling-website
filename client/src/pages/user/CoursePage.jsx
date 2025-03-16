import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { CourseCard } from "../../components/user/CourseCard";

export const CoursePage = () => {
  const { data: courses, isLoading, error } = useFetch("/courses/getCourses");

  console.log("Fetched courses:", courses); // ✅ Debugging: Check API response

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Our Courses</h1>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course._id} id={course._id} {...course} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No courses available.</p>
        )}
      </div>
    </div>
  );
};
