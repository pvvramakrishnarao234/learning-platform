const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      unique: true,
      required: [true, 'Job ID is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      trim: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    tags: {
      type: [String],
      validate: {
        validator: function (tags) {
          return tags.length <= 10;
        },
        message: 'Tags cannot exceed 10 entries',
      },
    },
  },
  { timestamps: true }
);

// Index for optimized search
jobPostSchema.index({ title: 'text', description: 'text', tags: 1 });

module.exports = mongoose.model('JobPost', jobPostSchema);
