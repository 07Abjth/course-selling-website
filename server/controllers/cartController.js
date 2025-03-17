import Cart from "../models/cartModel.js";
import Course from "../models/courseModel.js";

// ✅ Add course to cart
export const addCourseToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from request
    const { courseId } = req.body;

    // ✅ Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // ✅ Find or create cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, courses: [] });
      await cart.save(); // Save the new cart immediately
    }

    // ✅ Check if course is already in the cart
    const courseExists = cart.courses.some(item => item.equals(courseId));
    if (courseExists) {
      return res.status(400).json({ success: false, message: "Course already in cart" });
    }

    // ✅ Add the course to the cart
    cart.courses.push(courseId);
    await cart.save();

    res.status(200).json({ success: true, message: "Course added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Remove course from cart
export const removeCourseFromCart = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { courses: courseId } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, message: "Course removed from cart", cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "courses",
      select: "title price image instructor",
    });

    if (!cart || cart.courses.length === 0) {
      return res.status(404).json({ success: false, message: "Cart is empty" });
    }

    res.status(200).json({ success: true, cart: cart.courses });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
