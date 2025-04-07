const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const TeacherProfile = require('../models/TeacherProfile');
const StudentProfile = require('../models/StudentProfile');
const logger = require('../config/logger');
const { sendEmail } = require('../utils/email');
const mongoose = require('mongoose');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Token generation and cookie settings
const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '7d'
};

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/'
};

// Helper functions
const generateAuthToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_CONFIG.secret, { 
    expiresIn: JWT_CONFIG.expiresIn 
  });
};

const setAuthCookie = (res, token) => {
  res.cookie('token', token, COOKIE_CONFIG);
};


const normalizeTags = (tags) => Array.isArray(tags) 
  ? tags.map(tag => tag.trim().toLowerCase()) 
  : [];

const handleProfileCreation = async (role, userId, profileData) => {
  if (role === 'teacher') {
    return TeacherProfile.create({
      user: userId,
      ...profileData,
      contactNumber: contactNumber,
      tags: normalizeTags(profileData.tags)
    });
  }
  return StudentProfile.create({
    user: userId,
    gradeLevel: profileData.gradeLevel || '',
    subjects: profileData.subjects || []
  });
};

// Error handling middleware
const handleAuthError = (res, error, context) => {
  logger.error(`${context} Error: ${error.message}`, { stack: error.stack });
  
  const statusCode = error.statusCode || 500;
  const response = {
    message: error.message || 'Authentication error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  };

  return res.status(statusCode).json(response);
};

// Controller methods
exports.signup = async (req, res) => {
  console.log('Received signup request:', req.body);
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      code: 'VALIDATION_ERROR'
    });
  }
 
  const { firstName, lastName, email, password, role = 'student', ...profileData } = req.body;
 
  try {
    console.log('Step 1: Normalizing email...');
    const normalizedEmail = email.toLowerCase().trim();
 
    console.log('Step 2: Checking for existing user...');
    const [existingUser] = await Promise.all([
      User.findOne({ email: normalizedEmail }),
      validatePasswordStrength(password)
    ]);
 
    if (existingUser) {
      console.warn('Duplicate user detected:', normalizedEmail);
      return res.status(409).json({
        success: false,
        message: 'User already exists',
        code: 'USER_EXISTS'
      });
    }
 
    console.log('Step 3: Preparing profile data...');
    const processedProfileData = {
      ...profileData,
      contactNumber: `${profileData.countryCode}${profileData.contactNumber}`
      // languagesSpoken: profileData.languagesSpoken.map(lang => ({ language: lang }))
    };
 
    console.log('Step 4: Creating user with profile...');
    const user = await createUserWithProfile({
      firstName,
      lastName,
      email: normalizedEmail,
      password,
      role,
      profileData: processedProfileData
    });
 
    if (!user || !user._id) {
      throw new Error("User creation failed. User object is null or invalid.");
    }
 
    console.log('Step 5: Generating tokens...');
    const { token, verificationToken } = await generateAuthTokens(user);
 
    console.log('Step 6: Sending verification email...');
    if (process.env.SEND_EMAILS === 'true') {
await sendVerificationEmail(user.email, verificationToken)
        .catch(err => logger.error('Email queue failed', { error: err }));
    }
 
    console.log('Step 7: User registered successfully');
logger.info('New user registered', { userId: user._id, role: user.role });
 
    return res.status(201).json({
      success: true,
      data: {
        user: transformUserResponse(user),
        token
      },
      message: 'Registration successful'
    });
 
  } catch (error) {
    console.error('Error during signup process:', error);
    logger.error('Signup failed', {
      error: error.message,
      stack: error.stack
    });
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.expose ? error.message : 'Registration failed',
      code: error.code || 'SERVER_ERROR',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};
// Helper Functions (would be in separate utils file)

const validatePasswordStrength = (password) => {
  const minLength = 8;
  if (password.length < minLength) {
    throw Object.assign(new Error('Password too short'), {
      statusCode: 400,
      code: 'WEAK_PASSWORD',
      expose: true
    });
  }
  // Add more checks as needed
};

const createUserWithProfile = async ({ firstName, lastName, email, password, role, profileData }) => {
  try {
    console.log('📌 [createUserWithProfile] Creating User...');
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });
 
    const savedUser = await user.save();
    console.log('✅ User saved:', savedUser._id);
 
    const ProfileModel = role === 'teacher' ? TeacherProfile : StudentProfile;
 
    const profilePayload = {
      user: savedUser._id,
      ...profileData,
      ...(role === 'teacher' && { contactNumber: sanitizeContactNumber(profileData.contactNumber) })
    };
 
    const profile = new ProfileModel(profilePayload);
    const savedProfile = await profile.save();
 
    console.log('✅ Profile saved:', savedProfile._id);
 
    return savedUser;
  } catch (error) {
    console.error('❌ Error in createUserWithProfile:', error.message);
    throw new Error(`Failed to create user/profile: ${error.message}`);
  }
};
 


const sanitizeContactNumber = (number) => {
  if (!number) return null;
  const digits = number.toString().replace(/\D/g, '');
  return digits.length >= 10 ? parseInt(digits, 10) : null;
};

const generateAuthTokens = async (user) => {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  user.verificationToken = verificationToken;
  await user.save();

  return {
    token: jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    ),
    verificationToken
  };
};

const transformUserResponse = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  isVerified: user.isVerified
});

exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() })
      .select('+password');

    if (!user) {
      throw { message: 'Invalid credentials', statusCode: 401 };
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      throw { message: 'Invalid credentials', statusCode: 401 };
    }

    const token = generateAuthToken(user._id, user.role);
    setAuthCookie(res, token);

    logger.info(`User logged in`, { userId: user._id });
    return res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return handleAuthError(res, error, 'Signin');
  }
};

exports.googleSignin = async (req, res) => {
  const { token: googleToken, role } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, email, given_name, family_name, picture } = ticket.getPayload();

    let user = await User.findOne({ 
      $or: [
        { googleAuthId: sub },
        { email: email.toLowerCase() }
      ]
    });

    if (!user) {
      user = await User.create({
        role: role || 'student',
        firstName: given_name,
        lastName: family_name,
        email: email.toLowerCase(),
        googleAuthId: sub,
        password: crypto.randomBytes(32).toString('hex'),
        profilePicture: picture,
        isVerified: true
      });

      await handleProfileCreation(user.role, user._id, {});
    } else if (!user.googleAuthId) {
      user.googleAuthId = sub;
      await user.save();
    }

    const token = generateAuthToken(user._id, user.role);
    setAuthCookie(res, token);

    logger.info(`Google authentication`, { userId: user._id });
    return res.json({ 
      token, 
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return handleAuthError(res, error, 'Google Signin');
  }
};
exports.logout = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
        code: 'UNAUTHORIZED'
      });
    }

    // Clear cookies
    res.clearCookie('token', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/' 
    });

    // Optional refresh token cleanup
    if (req.cookies.refreshToken) {
      await TokenModel.deleteOne({ token: req.cookies.refreshToken });
      res.clearCookie('refreshToken', {
        httpOnly: true,
        path: '/'
      });
    }

    logger.info('User logged out', { userId: req.user._id });
    return res.json({ success: true, message: 'Logged out successfully' });

  } catch (error) {
    logger.error('Logout failed', { error });
    return res.status(500).json({ 
      success: false,
      message: 'Logout failed',
      code: 'SERVER_ERROR'
    });
  }
};

// Other methods (forgotPassword, resetPassword, logout, verifyEmail) remain the same
// with similar patterns of error handling and logging