const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      immutable: true
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    education: [
      {
        institution: { type: String, trim: true, required: true },
        degree: { type: String, trim: true },
        fieldOfStudy: { type: String, trim: true },
        startDate: { type: Date, required: true },
        endDate: {
          type: Date,
          validate: {
            validator: function (value) {
              return !this.current || value >= this.startDate;
            },
            message: 'End date must be after the start date'
          }
        },
        current: { type: Boolean, default: false }
      }
    ],
    skills: {
      type: [{ type: String, trim: true }],
      default: [],
      validate: {
        validator: function (skills) {
          return new Set(skills).size === skills.length;
        },
        message: 'Duplicate skills are not allowed'
      }
    },
    interests: {
      type: [{ type: String, trim: true }],
      default: [],
      validate: {
        validator: function (interests) {
          return new Set(interests).size === interests.length;
        },
        message: 'Duplicate interests are not allowed'
      }
    },
    webinarsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Webinar' }],
    jobsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for optimized querying
studentProfileSchema.index({ user: 1 });
studentProfileSchema.index({ 'education.institution': 1 });
studentProfileSchema.index({ skills: 1 });
studentProfileSchema.index({ interests: 1 });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
