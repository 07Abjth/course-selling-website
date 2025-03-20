import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const Cart = () => {
  const { userData } = useSelector((state) => state.user);  
  const userId = userData?.data?.id; // ✅ Fix: No syntax error

  console.log("User ID:", userId);

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCartItems = async () => {
    if (!userId) {
      console.error("🚨 Error: No user found");
      toast.error("User not logged in.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/cart/get-cart-items");
      console.log("Cart Response:", response.data);

      // ✅ Ensure the correct response structure
      setCartItems(response?.data?.data?.courses || []);
    } catch (error) {
      console.error("❌ Error fetching cart items:", error);
      toast.error("Failed to load cart.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  // ✅ Proceed to Payment
  const handleProceedToPayment = async () => {
    try {
      const response = await axiosInstance.post("/payment/create-checkout-session");
      console.log("Checkout Session:", response.data);
      window.location.replace(response.data.data.session.url);
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to proceed to payment.");
    }
  };

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
          cartItems.map((item) => {
            const course = item?.course || {};  
            return (
              <div key={course?._id || Math.random()} className="flex items-center justify-between border-b p-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={course.image || "/assets/default-course.jpg"} 
                    alt={course.title || "Course"} 
                    className="w-20 h-20 object-cover rounded-md" 
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{course.title || "Unknown Course"}</h3>
                    <p className="text-blue-500 font-bold">₹{course.price || "0"}</p>
                    <p className="text-black-500 font-bold">{course.description|| "0"}</p>

                  </div>
                </div>
                   {/* ✅ Action Buttons */}
                   <div className="mt-2 flex gap-4">
  <button className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md shadow-md hover:bg-yellow-500 transition duration-300">
    Add to Wishlist
  </button>
  <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-300">
    Remove
  </button>
</div>

              </div>
            ); 
          })
        )}
      </div>
     {/* ✅ Proceed to Payment Button */}
     <div className="flex justify-center mt-4">
        <button 
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};
