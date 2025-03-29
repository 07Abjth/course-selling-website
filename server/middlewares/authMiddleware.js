import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// ✅ Protect Routes (Check if User is Logged In)
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// ✅ Role-Based Access Control
export const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden: Access denied" });
    }
    next();
  };
};

// ✅ Special Check for Mentors (Only Approved Mentors Can Teach)
export const mentorOnly = async (req, res, next) => {
  if (req.user.role !== "mentor" || !req.user.isApproved) {
    return res.status(403).json({ success: false, message: "Mentor access denied" });
  }
  next();
};

// ✅ Admin Access Only
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access denied" });
  }
  next();
};
