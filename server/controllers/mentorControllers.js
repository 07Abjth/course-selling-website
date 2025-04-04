import Mentor from '../models/mentorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';

// ✅ Register a new mentor
export const registerMentor = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;

    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const mentorExists = await Mentor.findOne({ email });
    if (mentorExists) {
      return res.status(400).json({ success: false, message: "Mentor already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const mentor = new Mentor({ name, email, password: hashedPassword, phoneNumber });
    await mentor.save();

    if (mentor) {
      const token = generateToken(mentor, "mentor");

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

// ✅ Login mentor
export const loginMentor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, mentor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(mentor, "mentor");

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

// ✅ Get Mentor Profile
export const getMentorProfile = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized, please log in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const mentor = await Mentor.findById(decoded.id);

    if (!mentor) {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }

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

// ✅ Check Mentor
export const checkMentor = async (req, res) => {
  try {
    const { email, id } = req.query;
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Mentor not authenticated" });
    }

    let mentor;
    if (email) {
      mentor = await Mentor.findOne({ email });
    } else if (id) {
      mentor = await Mentor.findById(id);
    } else {
      mentor = await Mentor.findById(req.user.id);
    }

    if (!mentor) {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }

    return res.status(200).json({ success: true, data: { id: mentor._id, name: mentor.name, email: mentor.email, role: mentor.role } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a Mentor by ID
export const getMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.user.id); // Use ID from token

    if (!mentor) {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }

    return res.status(200).json({ success: true, mentor });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
