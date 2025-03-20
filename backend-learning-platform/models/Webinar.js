const mongoose = require('mongoose');

const webinarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  webinarId: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  meetLink: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Webinar', webinarSchema);