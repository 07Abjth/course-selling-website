import React from "react";

export const Cart = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
          Your Cart 🛒
        </h2>

        {/* Empty Cart Message */}
        <div className="text-center py-10 text-gray-600">
          <p>Your cart is currently empty.</p>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
