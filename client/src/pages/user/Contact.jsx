import React from "react";

export const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600">We'd love to hear from you!</p>
      <form className="mt-6 bg-white p-6 shadow-md rounded-md w-96">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-2 border rounded-md mb-3 h-24 focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Send Message
        </button>
      </form>
    </div>
  );
};
