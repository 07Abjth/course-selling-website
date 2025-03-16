import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Carousel } from "./Carousel"; // If you have a carousel

export const Home = () => {
  const { isUserAuth, userData } = useSelector((state) => state.user); // Get user state

  return (
    <div className="bg-gray-100 text-gray-900">
      <section className="h-screen flex flex-col justify-center items-center text-center bg-blue-500 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {isUserAuth ? `Welcome, ${userData?.name} 🎉` : "Welcome to Our Platform!"}
        </h1>

        {isUserAuth ? (
          <>
            <p className="text-lg md:text-xl max-w-2xl">
              Continue learning and unlock new opportunities with expert-led courses.
            </p>
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <Link to="/dashboard" className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-200 transition">
                Go to Dashboard
              </Link>
              <Link to="/user/my-learnings" className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition">
                My Learnings
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg md:text-xl max-w-2xl">
              Join us and start your learning journey with the best courses.
            </p>
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <Link to="/login" className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-500 transition">
                Login
              </Link>
              <Link to="/signup" className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-200 transition">
                Sign Up
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
