import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { CourseCard } from "../../components/user/CourseCard";

export const CoursePage = () => {
  const { data: courses, isLoading, error } = useFetch("/courses/getCourses");

  console.log("Fetched courses:", courses); // ✅ Debugging: Check API response

  // ✅ Category Mapping: Group similar categories together
  const categoryMap = {
    "IT & Software": ["Data Science & Machine Learning", "Web Development", "App Development", "Programming"], 
    "Internet of Things": ["Internet of Things"],
    "Digital Marketing & Business": ["Digital Marketing & Business", "Business"],
    "Photography": ["Photography"],
    "Finance & Accounting": ["Finance & Accounting"],
    "Lifestyle": ["Lifestyle"],
    "Marketing": ["Marketing"]
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Our Courses</h1>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}

      {/* ✅ Loop through categories and render courses under each */}
      {Object.keys(categoryMap).map((category) => {
        const filteredCourses = Array.isArray(courses)
          ? courses.filter((course) => {
              console.log(`Checking ${course.title} for category: ${course.category}`); // Debugging
              return categoryMap[category].includes(course.category);
            })
          : [];

        return (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">{category}</h2>
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course._id} id={course._id} {...course} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No courses available for {category}.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
