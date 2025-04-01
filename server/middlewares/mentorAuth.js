import jwt from 'jsonwebtoken';

export const mentorAuth = (req, res, next) => {
  const decoded = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
  // Log the token for debugging
  console.log('Token received in authUser middleware:', token);

  if (!decoded) {
    return res.status(403).json({ success: false, message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ success: false, message: 'Token expired' });
      }
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

 // Check if the user has the 'mentor' or 'admin' role
 if (decoded.role !== 'mentor' && decoded.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied, only mentors and admins can proceed' });
  }

    // Log the decoded token
    console.log('Decoded token in authUser middleware:', decoded);

    req.user = decoded;
    next();
  });
};
