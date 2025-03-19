import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  const token =
    req.cookies.token || req.headers.authorization?.split(" ")[1];

  console.log("🔍 Token received:", token); // Debugging

  if (!token) {
    return res.status(403).json({ success: false, message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("🚨 Token verification error:", err.message);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};
