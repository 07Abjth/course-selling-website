// controllers/mentorController.js
import Mentor from '../models/mentorModel.js';
 import bcrypt from 'bcrypt';   
import generateToken from '../utils/generateToken.js';  


// Register a new user
export const registerMentor = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    // Check if the user already exists
    const userExists = await Mentor.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Mentor already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

console.log("password====>",password);
console.log("hashedPassword====>",hashedPassword);



    // Create a new user
    const user = new Mentor({ name, email, password: hashedPassword, phoneNumber });
    await user.save();

    // If user creation is successful, generate a JWT token
    if (user) {
      const token = generateToken(user, "mentor");

      // Send the token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
        sameSite: "strict",
      });

      return res.status(201).json({
        success: true,
        message: "Mentor created successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid mentor data" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



// Login a user
export const loginMentor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // If login is successful, generate a JWT token
    const token = generateToken(user, "mentor");

    // Send the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Logout mentor
export const logoutMentor = async (req, res) => {
  try {
   // Clear the token cookie when logging out
res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
});


    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



// Get user profile (Authenticated)
export const getMentorProfile = async (req, res) => {
  try {
    const token = req.cookies.token;

    // If no token is found, return an error
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized, please log in' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the decoded user ID
    const user = await Mentor.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }

    // Return the user's profile information
    return res.status(200).json({
      success: true,
      message: 'Mentor profile fetched successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        // You can add more fields like address, avatar, etc. based on your model
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



// Controller function for handling mentor dashboard
export const getMentorDashboard = async (req, res) => {
  try {
    // Access the user data attached to the request by the mentorAuth middleware
    const user = req.user;

    // Send a response with mentor data (you can add more data as needed)
    return res.json({
      success: true,
      message: 'Welcome to the mentor dashboard!',
      user: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        // You can add more details about the mentor as needed
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};