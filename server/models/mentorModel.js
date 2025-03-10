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
    required: true,
  },
  role: {
    type: String,
    enum: ['mentor', 'admin'],
    default: 'mentor',
  },
});

const Mentor = mongoose.model('Mentor', mentorSchema);
export default Mentor;
