import React from "react";

export const MentorHome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
       

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">Welcome, Mentor!</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your courses, track students, and schedule sessions with ease.
          </p>
          <div className="mt-6 space-x-4">
            <a href="/dashboard" className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600">
              Go to Dashboard
            </a>
            <a href="/profile" className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-md shadow-md hover:bg-gray-700">
              View Profile
            </a>
          </div>
        </div>
      </div>

       
    </div>
  );
};
