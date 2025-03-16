import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { axiosInstance } from "../../config/axiosInstance";

export const UserHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout"); // ✅ Proper API Call
      localStorage.removeItem("userToken"); // ✅ Remove token
      navigate("/"); 
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About</Link>
          <Link to="/course-page" className="hover:text-blue-400 transition">Courses</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
          <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
          <Link to="/user/my-learnings" className="hover:text-blue-400 transition">My Learnings</Link>
          <Link to="/user/profile" className="hover:text-blue-400 transition">Profile</Link>
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
