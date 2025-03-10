import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export const UserHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
    window.location.reload(); // Reload to update `UserLayout`
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-400 transition">
            About
          </Link>
          <Link to="/course-page" className="hover:text-blue-400 transition">
            Courses
          </Link>
          <Link to="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
          <Link to="/dashboard" className="hover:text-blue-400 transition">
            Dashboard
          </Link>
          <Link to="/my-learnings" className="hover:text-blue-400 transition">
            My Learnings
          </Link>
          <Link to="/profile" className="hover:text-blue-400 transition">
            Profile
          </Link>
        </nav>

        <button
          className="px-4 py-2 border border-white rounded flex items-center space-x-1 hover:bg-red-500 transition"
          onClick={handleLogout}
        >
          <LogOut size={20} /> <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
