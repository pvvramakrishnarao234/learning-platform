const mongoose = require('mongoose');
 
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 3, maxlength: 50 },
  description: { type: String, required: true, trim: true, minlength: 10, maxlength: 200 },
  pricePerHour: { type: Number, required: true, min: 0, max: 1000 }
}, { _id: false });
 
const teacherProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, immutable: true },
 
  bio: { type: String, required: true, trim: true, minlength: 20, maxlength: 1000 },
 
  services: { type: [serviceSchema], default: [] },
 
  location: { type: String, trim: true, maxlength: 100 },
 
  // languagesSpoken: {
  //   type: [String],
  //   default: [],
  //   set: arr => arr.map(lang => lang.trim().toLowerCase())
  // },
 
  tags: {
    type: [String],
    default: [],
    set: arr => arr.map(tag => tag.trim().toLowerCase()),
    // validate: {
    //   validator: arr => arr.every(tag => tag.length >= 2 && tag.length <= 25),
    //   message: 'Each tag must be between 2 and 25 characters'
    // }
  },
 
  contactNumber: {
    type: String,
    required: true,
    set: function (phone) {
      if (typeof phone === 'string' && !phone.startsWith('+') && this.countryCode) {
        return `${this.countryCode}${phone.replace(/\D/g, '')}`;
      }
      return phone;
    }
    // validate: {
    //   validator: v => /^\+\d{10,15}$/.test(v),
    //   message: 'Phone must include country code (e.g., +91) followed by 10-15 digits'
    // }
  },
 
  countryCode: {
    type: String,
    required: function () {
      return !this.contactNumber?.startsWith('+');}
      
    // },
    // validate: {
    //   validator: v => /^\+\d{1,4}$/.test(v),
    //   message: 'Country code must start with + (e.g., +91)'
    // }
  },
 
  socialMedia: {
    linkedIn: {
      type: String,
      trim: true
      // match: [/^https?:\/\/(www\.)?linkedin\.com\/.+/i, 'Please provide a valid LinkedIn URL']
    },
    twitter: {
      type: String,
      trim: true
      // match: [/^https?:\/\/(www\.)?x\.com\/.+/i, 'Please provide a valid Twitter URL']
    }
  }
 
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.countryCode;
      return ret;
    }
  },
  toObject: { virtuals: true }
});
 
// Indexes
teacherProfileSchema.index({ bio: 'text', 'services.name': 'text' });
teacherProfileSchema.index({ tags: 1, languagesSpoken: 1 });
 
// Virtual
teacherProfileSchema.virtual('fullName').get(function () {
  return `${this.user.firstName} ${this.user.lastName}`;
});
 
// Validation
teacherProfileSchema.pre('save', function (next) {
  const serviceNames = this.services.map(s => s.name.toLowerCase());
  if (new Set(serviceNames).size !== serviceNames.length) {
    return next(new Error('Duplicate service names are not allowed'));
  }
  next();
});
 
module.exports = mongoose.model('TeacherProfile', teacherProfileSchema);
 