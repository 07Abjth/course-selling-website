import jwt from "jsonwebtoken";
import User  from "../models/userModel.js";



// export const authUser = (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
//   // Log the token for debugging
//   console.log('Token received in authUser middleware:', token);

//   if (!token) {
//     return res.status(403).json({ success: false, message: 'Token missing' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       if (err instanceof jwt.TokenExpiredError) {
//         return res.status(401).json({ success: false, message: 'Token expired' });
//       }
//       return res.status(401).json({ success: false, message: 'Invalid token' });
//     }

//     // Log the decoded token
//     console.log('Decoded token in authUser middleware:', decoded);

//     req.user = decoded;
//     next();
//   });
// };

export const authUser = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  console.log("🔍 Token received:", token);

  if (!token) {
    console.log("🚨 No token found");
    return res.status(403).json({ success: false, message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("🚨 Token verification error:", err.message);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    console.log("✅ Token decoded:", decoded);
    req.user = decoded;
    next();
  });
};
