import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";

export const MentorHeader = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Branding */}
        <Link to="/mentor/dashboard" className="text-2xl font-bold">
          Mentor Portal
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6">
        <Link to="/mentor/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
          <Link to="/mentor/courses" className="hover:text-gray-200">
            Courses
          </Link>
          <Link to="/mentor/students" className="hover:text-gray-200">
            Students
          </Link>
          <Link to="/mentor/profile" className="hover:text-gray-200">
            Profile
          </Link>
        </nav>
 <DarkMode/>
        {/* Logout Button */}
        <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
};
