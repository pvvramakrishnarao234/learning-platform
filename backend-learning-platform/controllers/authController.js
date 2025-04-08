const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const User = require('../models/User');
const TeacherProfile = require('../models/TeacherProfile');
const StudentProfile = require('../models/StudentProfile');
const logger = require('../config/logger');
const { sendEmail } = require('../utils/email');

require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Token and JWT and Cookie Config
const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
};

// Helper Functions
const generateAuthToken = (userId, role) => {
  console.log("JWT_SECRET:", JWT_CONFIG.secret); 
  return jwt.sign({ id: userId, role }, JWT_CONFIG.secret, {
    expiresIn: JWT_CONFIG.expiresIn,
  });
};

const setAuthCookie = (res, token) => {
  res.cookie('token', token, COOKIE_CONFIG);
};

const normalizeTags = (tags) =>
  Array.isArray(tags) ? tags.map((tag) => tag.trim().toLowerCase()) : [];

const handleProfileCreation = async (role, userId, profileData) => {
  if (role === 'teacher') {
    const services = (profileData.services || []).map(service => ({
      name: typeof service === 'string' ? service : service.name,
      description: service.description || '', // Optional
      pricePerHour: service.pricePerHour || null, // Optional
    }));
    return TeacherProfile.create({
      user: userId,
      bio: profileData.bio || '',
      contactNumber: profileData.contactNumber || '',
      services,
      languagesSpoken: profileData.languagesSpoken || [],
      tags: normalizeTags(profileData.tags),
    });
  }
  return StudentProfile.create({
    user: userId,
    gradeLevel: profileData.gradeLevel || '',
    subjects: profileData.subjects || [],
  });
};

const transformUserResponse = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  isVerified: user.isVerified,
  isStudentOrTeacher: user.role === 'student' || user.role === 'teacher', // New field
});

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, role = 'student', ...profileData } = req.body;

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail, role });
    if (existingUser) {
      logger.warn(`Signup attempt with existing email and role: ${normalizedEmail}, ${role}`);
      return res.status(409).json({ message: 'User already exists', code: 'USER_EXISTS' });
    }

    logger.info(`Signup password input: ${password}`, { email: normalizedEmail, role });
    const hashedPassword = await bcrypt.hash(password, 12);
    logger.info(`Hashed password: ${hashedPassword}`, { email: normalizedEmail, role });

    const user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      verificationToken: crypto.randomBytes(32).toString('hex'),
    });

    await handleProfileCreation(role, user._id, profileData);

    const token = generateAuthToken(user._id, user.role);
    setAuthCookie(res, token);

    if (process.env.SEND_EMAILS === 'true') {
      await sendEmail({
        to: user.email,
        subject: 'Verify Your Email',
        text: `Please verify your email: ${process.env.FRONTEND_URL}/verify-email/${user.verificationToken}`,
      });
      logger.info(`Verification email sent to ${user.email}`, { userId: user._id });
    }

    logger.info(`User signed up successfully`, { userId: user._id, role });
    return res.status(201).json({
      message: 'Registration successful',
      user: transformUserResponse(user),
      token,
    });
  } catch (error) {
    logger.error(`Signup failed: ${error.message}`, { stack: error.stack });
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        message: 'Validation failed',
        errors,
        code: 'VALIDATION_ERROR',
      });
    }
    return res.status(500).json({ message: 'Registration failed', code: 'SERVER_ERROR' });
  }
};

exports.signin = async (req, res) => {
  const { email, password, role } = req.body;

  if (!role || !['student', 'teacher', 'admin'].includes(role)) {
    logger.warn(`Signin attempt failed: Invalid or missing role for ${email}`);
    return res.status(400).json({ message: 'Role is required and must be student, teacher, or admin', code: 'INVALID_ROLE' });
  }

  try {
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      role,
    }).select('+password');
    
    if (!user) {
      logger.warn(`Signin failed: No user found`);
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }
  
    console.log('Input Password:', `'${password}'`);
    console.log('Stored Hash:', `'${user.password}'`);
  
    const isMatch = await bcrypt.compare(password.trim(), user.password.trim());
    console.log('bcrypt.compare result:', isMatch);
  
    logger.info(`Password match result: ${isMatch}`, { email, role });
  
    if (!isMatch) {
      logger.warn(`Signin attempt failed: Incorrect password for ${email} with role ${role}`);
      return res.status(401).json({ message: 'Invalid credentials or role', code: 'INVALID_CREDENTIALS' });
    }

    const token = generateAuthToken(user._id, user.role);
    setAuthCookie(res, token);

    logger.info(`User signed in`, { userId: user._id, role: user.role });
    return res.json({
      message: 'Signin successful',
      user: transformUserResponse(user),
      token,
    });
  } catch (error) {
    logger.error(`Signin failed: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: 'Signin failed', code: 'SERVER_ERROR' });
  }
};

exports.googleSignin = async (req, res) => {
  const { token: googleToken, role = 'student' } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, email, given_name, family_name } = ticket.getPayload();

    let user = await User.findOne({ $or: [{ googleAuthId: sub }, { email: email.toLowerCase() }] });
    if (!user) {
      user = await User.create({
        role,
        firstName: given_name,
        lastName: family_name,
        email: email.toLowerCase(),
        googleAuthId: sub,
        password: crypto.randomBytes(32).toString('hex'), // Random password for Google users
        isVerified: true,
      });
      await handleProfileCreation(role, user._id, {});
    } else if (!user.googleAuthId) {
      user.googleAuthId = sub;
      await user.save();
    }

    const token = generateAuthToken(user._firefoxId, user.role);
    setAuthCookie(res, token);

    logger.info(`Google signin successful`, { userId: user._id });
    return res.json({
      message: 'Google signin successful',
      user: transformUserResponse(user),
      token,
    });
  } catch (error) {
    logger.error(`Google signin failed: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: 'Google signin failed', code: 'SERVER_ERROR' });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('token', COOKIE_CONFIG);
    logger.info(`User logged out`, { userId: req.user?.id || 'unknown' });
    return res.json({ message: 'Logged out successfully' });
  } catch (error) {
    logger.error(`Logout failed: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: 'Logout failed', code: 'SERVER_ERROR' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal if email exists for security
      return res.json({ message: 'If the email exists, a reset link has been sent' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `Reset your password here: ${resetUrl}`,
    });

    logger.info(`Password reset requested`, { userId: user._id });
    return res.json({ message: 'If the email exists, a reset link has been sent' });
  } catch (error) {
    logger.error(`Forgot password failed: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: 'Reset request failed', code: 'SERVER_ERROR' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token', code: 'INVALID_TOKEN' });
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    logger.info(`Password reset successful`, { userId: user._id });
    return res.json({ message: 'Password reset successful' });
  } catch (error) {
    logger.error(`Reset password failed: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: 'Reset password failed', code: 'SERVER_ERROR' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token', code: 'INVALID_TOKEN' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    const authToken = generateAuthToken(user._id, user.role);
    setAuthCookie(res, authToken);

    logger.info(`Email verified`, { userId: user._id });
    return res.json({
      message: 'Email verified successfully',
      user: transformUserResponse(user),
      token: authToken,
    });
  } catch (error) {
    logger.error(`Email verification failed: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: 'Verification failed', code: 'SERVER_ERROR' });
  }
};