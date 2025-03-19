const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobPost' }],
  webinarsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Webinar' }],
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);