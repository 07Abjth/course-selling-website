import React from "react";
import { Link } from "react-router-dom";

export const CourseCard = ({ id, title, description, image, price }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-300">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      <p className="text-lg font-bold text-blue-500">₹{price}</p>

      {/* ✅ Clicking here will take the user to full course details */}
      <Link to={`/course-details-page/${id}`} className="text-blue-500 underline mt-2 block">
        More Details
      </Link>

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
  );
};
