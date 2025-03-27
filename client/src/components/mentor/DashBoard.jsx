import React, { useState, useEffect } from 'react';

export const DashBoard = () => {
  // ✅ State to store user data
  const [user, setUser] = useState("John Doe");
  const [stats, setStats] = useState({ courses: 0, students: 0, earnings: 0 });

  // ✅ Simulating fetching data (e.g., API call)
  useEffect(() => {
    setTimeout(() => {
      setStats({ courses: 5, students: 120, earnings: 5000 }); // Simulated API response
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* ✅ Welcome message */}
      <h1 className="text-3xl font-bold text-gray-800">Welcome, {user}!</h1>
      <p className="text-gray-600 mt-2">Here’s an overview of your dashboard:</p>

      {/* ✅ Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Courses</h2>
          <p className="text-3xl font-bold text-blue-500">{stats.courses}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Students</h2>
          <p className="text-3xl font-bold text-green-500">{stats.students}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Earnings</h2>
          <p className="text-3xl font-bold text-yellow-500">${stats.earnings}</p>
        </div>
      </div>

      {/* ✅ Navigation Section */}
      <div className="mt-8 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          Manage Courses
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">
          View Students
        </button>
      </div>
    </div>
  );
};
