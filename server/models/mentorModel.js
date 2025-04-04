// models/mentorModel.js
import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['mentor', 'admin'],
    default: 'mentor',
  },
  bio: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    default: 'https://www.example.com/default-profile.png',
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
}, { timestamps: true });


const Mentor = mongoose.model('Mentor', mentorSchema);
export default Mentor;
