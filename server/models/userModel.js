import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {  // ✅ Add profile picture field
    type: String,
    default: "https://www.example.com/default-profile.png", // Default profile picture
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'mentor'],
    default: 'user',
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
