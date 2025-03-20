const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  jobId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('JobPost', jobPostSchema);