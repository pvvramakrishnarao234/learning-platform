const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');
const { toLower } = require('../utils/sanitizers');

const roles = ['student', 'teacher', 'admin'];

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: roles,
      required: true,
      default: 'student',
      index: true, // Indexing for faster queries
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
      match: [/^[a-zA-Z\s\-']+$/, 'Please enter a valid first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
      match: [/^[a-zA-Z\s\-']+$/, 'Please enter a valid last name'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [12, 'Password must be at least 12 characters long'],
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    profilePicture: {
      type: String,
      default: 'default-avatar.png',
      validate: [validator.isURL, 'Please provide a valid URL'],
    },
    googleAuthId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
// userSchema.index({ email: 1 }, { unique: true });
// userSchema.index({ googleAuthId: 1 }, { sparse: true });

// // Document middleware - Hash Password Before Saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(12);
//     this.password = await bcrypt.hash(this.password, salt);
//     if (!this.isNew) this.passwordChangedAt = Date.now() - 1000;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // Sanitize email before saving
// userSchema.pre('save', function (next) {
//   if (!this.isModified('email') || this.isNew) return next();
//   this.email = toLower(this.email);
//   next();
// });

// // Query middleware to hide inactive users
// userSchema.pre(/^find/, function (next) {
//   this.find({ isActive: { $ne: false } });
//   next();
// });

// // Instance Methods
// userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
//     return JWTTimestamp < changedTimestamp;
//   }
//   return false;
// };

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString('hex');
//   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//   this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
//   return resetToken;
// };

// // Virtuals for full name
// userSchema.virtual('fullName').get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });


// Webinar Schema
const webinarSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    webinarId: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    meetLink: {
      type: String,
      required: true,
      validate: [validator.isURL, 'Please provide a valid webinar link'],
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Webinar = mongoose.model('Webinar', webinarSchema);

module.exports = {  Webinar };
