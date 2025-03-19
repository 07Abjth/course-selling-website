import Cart from "../models/cartModel.js";
import Course from "../models/courseModel.js";

// Helper function to calculate total amount
const calculateTotal = async (cartCourses) => {
  let total = 0;
  for (const item of cartCourses) {
    const course = await Course.findById(item.course);
    if (course) {
      total += course.price * item.quantity;
    }
  }
  return total;
};

// ✅ Add course to cart
export const addCourseToCart = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, courses: [] });
    }

    const courseIndex = cart.courses.findIndex((item) => item.course.toString() === courseId);
    if (courseIndex !== -1) {
      return res.status(400).json({ success: false, message: "Course already in cart" });
    }

    cart.courses.push({ course: courseId, quantity: 1 });

    cart.totalAmount = await calculateTotal(cart.courses);
    await cart.save();

    res.status(200).json({ success: true, message: "Course added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Remove course from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, courseId } = req.user.id;

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { courses: { course: courseId } } },
      { new: true }
    ).populate("courses.course");

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.totalAmount = await calculateTotal(cart.courses);
    await cart.save();

    res.json({ success: true, message: "Course removed", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get user cart
// export const getCart = async (req, res) => {
//   try {
//     const userId  = req.user.id;

//     const cart = await Cart.findOne({ userId }).populate("courses.courseId").exec();

//     if (!cart) {
//       return res.json({ success: false, message: "Cart is empty" });
//     }

//     res.status(200).json({message:"cart items fetched",data: cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Get user ID from token

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized, user ID missing" });
    }

    const cart = await Cart.findOne({ user: userId }) // ✅ Corrected field name
      .populate("courses.course")
      .exec();

    if (!cart) {
      return res.status(200).json({ success: true, message: "Cart is empty", data: [] });
    }

    res.status(200).json({ success: true, message: "Cart items fetched", data: cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
