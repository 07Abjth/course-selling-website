import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const Cart = () => {
   const { userData } = useSelector((state) => state.user); // ✅ Get user from Redux
   const userId = userData?.data?.id; 

  console.log("User ID:", userId);

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCartItems = async () => {
    if (!userId) {
      console.error("Error: No user found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get('/cart/get-cart-items');
      setCartItems(response?.data?.cart?.courses || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to load cart.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Your Cart 🛒</h2>

        {isLoading ? (
          <p className="text-center py-10 text-gray-600">Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <p>Your cart is currently empty.</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item?.course?._id} className="flex items-center justify-between border-b p-4">
              <div className="flex items-center space-x-4">
                <img src={item?.course?.image} alt={item?.course?.title} className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-semibold">{item?.course?.title}</h3>
                  <p className="text-blue-500 font-bold">₹{item?.course?.price}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
