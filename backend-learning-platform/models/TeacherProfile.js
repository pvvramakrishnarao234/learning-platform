const mongoose = require('mongoose');

const teacherProfileSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  bio: { type: String },
  description: { type: String },
  services: [{
    name: { type: String, required: true },
    description: { type: String },
    pricePerHour: { type: Number, required: true },
  }],
  location: { type: String },
  timings: { type: String }, // e.g., "9 AM - 5 PM"
  languagesSpoken: [{ type: String }],
  tags: [{ type: String, maxlength: 25 }],
  contactNumber: { type: String },
  lastLogin: { type: Date, default: Date.now },
  jobsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobPost' }],
  webinarsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Webinar' }],
}, { timestamps: true });

module.exports = mongoose.model('TeacherProfile', teacherProfileSchema);