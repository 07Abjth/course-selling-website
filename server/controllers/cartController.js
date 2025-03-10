import Cart from "../models/cartModel.js";

// Add course to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, courses: [courseId] });
    } else {
      if (!cart.courses.includes(courseId)) {
        cart.courses.push(courseId);
      }
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove course from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { courses: courseId } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("courses");
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
