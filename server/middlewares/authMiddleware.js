import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// ✅ Protect Routes (Check if User is Logged In)
export const protect = async (req, res, next) => {
  try {
    console.log("🔍 Checking authentication...");
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("✅ User authenticated:", req.user);
    next();
  } catch (error) {
    console.log("❌ Token error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
