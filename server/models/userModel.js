import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "https://www.example.com/default-profile.png" },
    
    // ✅ Role-Based Access
    role: { type: String, enum: ["user", "mentor", "admin"], default: "user" },

    // ✅ Mentor-Specific Fields
    bio: { type: String }, // Mentor's bio
    expertise: [{ type: String }], // Areas of expertise
    isApproved: { type: Boolean, default: false }, // ✅ Needs admin approval to teach

    // ✅ Admin-Specific Fields
    isAdmin: { type: Boolean, default: false }, // Only true for admin accounts

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
