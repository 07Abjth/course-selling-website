// controllers/mentorController.js
import Mentor from '../models/mentorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // ✅ Ensure JWT is imported
import generateToken from '../utils/generateToken.js';

// ✅ Register a new mentor
export const registerMentor = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    // ✅ Check if the mentor already exists
    const mentorExists = await Mentor.findOne({ email });
    if (mentorExists) {
      return res.status(400).json({ success: false, message: "Mentor already exists" });
    }

    // ✅ Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("password====>", password);
    console.log("hashedPassword====>", hashedPassword);

    // ✅ Create a new mentor
    const mentor = new Mentor({ name, email, password: hashedPassword, phoneNumber });
    await mentor.save();

    // ✅ Generate token for authentication
    if (mentor) {
      const token = generateToken(mentor, "mentor");

      // ✅ Send token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(201).json({
        success: true,
        message: "Mentor registered successfully",
        _id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        token,
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid mentor data" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Login a mentor (Fixed `User` -> `Mentor`)
export const loginMentor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate email and password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // ✅ Find the mentor by email (Fixed the model from `User` to `Mentor`)
    const mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Compare password with hashed password
    const isMatch = await bcrypt.compare(password, mentor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Generate token upon successful login
    const token = generateToken(mentor, "mentor");

    // ✅ Send token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      _id: mentor._id,
      name: mentor.name,
      email: mentor.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Logout mentor
export const logoutMentor = async (req, res) => {
  try {
    // ✅ Clear the token cookie when logging out
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

// ✅ Get Mentor Profile (Authenticated)
export const getMentorProfile = async (req, res) => {
  try {
    const token = req.cookies.token;

    // ✅ If no token, return error
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized, please log in" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Find the mentor by decoded ID
    const mentor = await Mentor.findById(decoded.id);

    if (!mentor) {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }

    // ✅ Return mentor profile data
    return res.status(200).json({
      success: true,
      message: "Mentor profile fetched successfully",
      mentor: {
        _id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        phoneNumber: mentor.phoneNumber,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Mentor Dashboard
export const getMentorDashboard = async (req, res) => {
  try {
    // ✅ Access mentor data attached by middleware
    const mentor = req.user;

    return res.json({
      success: true,
      message: "Welcome to the mentor dashboard!",
      mentor: {
        name: mentor.name,
        email: mentor.email,
        phoneNumber: mentor.phoneNumber,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
