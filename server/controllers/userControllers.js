import User from '../models/userModel.js';  
import bcrypt from 'bcrypt';   
import generateToken from '../utils/generateToken.js';  



// Register a new user
export const registerUser = async (req, res) => {
  try {
    console.log("🔍 Received Data:", req.body); // ✅ Debugging Line

    const { name, email, phoneNumber, password, confirmPassword, profilePic } = req.body;

    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phoneNumber, // ✅ Ensure phoneNumber is stored
      password: hashedPassword,
      profilePic: profilePic || "https://www.example.com/default-profile.png",
    });

    await user.save();

    if (user) {
      const token = generateToken(user, "user");

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profilePic: user.profilePic,
        },
        token,
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user, "user");

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Logout a user
export const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    });

    return res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


 // Get user profile
 export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user?.id; // Get from URL or Token
    console.log("🔍 Fetching profile for User ID:", userId);

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // ✅ Fetch user details excluding password
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Check user
 export const checkUser = async (req, res) => {
  try {
    const { email, id } = req.query;
    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    let user = email ? await User.findOne({ email }) : id ? await User.findById(id) : await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
