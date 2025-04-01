import { protect } from "./authMiddleware.js";

// ✅ Role-Based Access Control Middleware
export const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user found" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden: Access denied" });
    }

    next();
  };
};

// ✅ Combined Authentication & Authorization Middleware (Only Mentor)
export const protectAndAuthorize = () => {
    return async (req, res, next) => {
      await protect(req, res, async () => {
        if (!req.user || req.user.role !== 'mentor') {
          return res.status(403).json({ success: false, message: "Forbidden: Access denied" });
        }
        next();
      });
    };
  };
  

// ✅ Mentor-Only Access (Only Approved Mentors)
export const mentorOnly = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized: No user found" });
  }

  if (req.user.role !== "mentor" || !req.user.isApproved) {
    return res.status(403).json({ success: false, message: "Mentor access denied" });
  }

  next();
};

// ✅ Admin Access Only
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized: No user found" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access denied" });
  }

  next();
};
