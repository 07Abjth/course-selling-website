import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // ✅ Get user ID from Redux store
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const Cart = () => {
  const { userData } = useSelector((state) => state.user); // ✅ Get logged-in user
  const userId = userData?.id; // ✅ Ensure user ID is available
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch cart items from backend
  const fetchCartItems = async () => {
    if (!userId) return;
    try {
      const response = await axiosInstance.get(`/cart/get-cart-items/${userId}`);
      setCartItems(response.data.cart || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to load cart items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  // ✅ Remove course from cart
  const removeFromCart = async (courseId) => {
    try {
      await axiosInstance.post("/cart/remove-cart-item", { userId, courseId });
      toast.success("Item removed from cart");
      fetchCartItems(); // Refresh cart
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    }
  };

  // ✅ Calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + item.course.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Your Cart 🛒</h2>

        {loading ? (
          <p className="text-center text-gray-600 py-6">Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <p>Your cart is currently empty.</p>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="divide-y mt-4">
              {cartItems.map((item) => (
                <li key={item.course._id} className="flex justify-between items-center py-4">
                  <div className="flex items-center gap-4">
                    <img src={item.course.image} alt={item.course.title} className="w-16 h-16 rounded-md shadow-md" />
                    <div>
                      <h3 className="font-semibold text-lg">{item.course.title}</h3>
                      <p className="text-gray-600 text-sm">₹{item.course.price}</p>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() => removeFromCart(item.course._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* ✅ Cart Summary & Checkout */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-xl font-bold text-gray-800">Total: ₹{totalAmount}</h3>
              <button className="w-full mt-4 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
