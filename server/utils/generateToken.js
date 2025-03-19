import jwt from 'jsonwebtoken';

const generateToken = (user, role) => {
  try {
    const token = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // ✅ Token expires in 7 days
    ); 
    return token;
  } catch (error) {
    console.log("Error generating token:", error);
  }
};

export default generateToken;
