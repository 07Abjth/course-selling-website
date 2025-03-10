import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "./Carousel";

export const Home = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("userToken") ? "User" : "";
    setUser(storedUser);
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900">
      <section className="h-screen flex flex-col justify-center items-center text-center bg-blue-500 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome, {user ? `${user} 🎉` : "Guest!"}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Continue your learning journey and unlock new opportunities with expert-led courses.
        </p>
        <div className="mt-6">
          {user ? (
            <Link to="/my-learning" className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-200 transition">
              Resume Learning
            </Link>
          ) : (
            <Link to="/login" className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-500 transition">
              Login to Start Learning
            </Link>
          )}
        </div>
      </section>
      
    </div>
  );
};
