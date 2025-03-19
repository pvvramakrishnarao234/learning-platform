const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const User = require('../models/User');
const TeacherProfile = require('../models/TeacherProfile');
const StudentProfile = require('../models/StudentProfile');
const logger = require('../config/logger');
const transporter = require('../config/email');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.signup = async (req, res) => {
  const {
    role, firstName, lastName, email, password, retypePassword,
    bio, description, services, profilePicture, location, timings, languagesSpoken, tags, contactNumber
  } = req.body;

  if (password !== retypePassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      role,
      firstName,
      lastName,
      email,
      password,
      profilePicture: profilePicture || 'default-avatar.png',
    });
    await user.save();

    if (role === 'teacher') {
      const teacherProfile = new TeacherProfile({
        user: user._id,
        bio,
        description,
        services: services || [],
        location,
        timings,
        languagesSpoken: languagesSpoken || [],
        tags: tags || [],
        contactNumber,
      });
      await teacherProfile.save();
    } else if (role === 'student') {
      const studentProfile = new StudentProfile({ user: user._id });
      await studentProfile.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    logger.info(`User signed up: ${email}`);
    res.status(201).json({
      token,
      userId: user._id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    logger.error(`Signup error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.signin = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? '7d' : '1h',
    });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    });
    logger.info(`User signed in: ${email}`);
    res.json({ token, userId: user._id, role: user.role, firstName: user.firstName, lastName: user.lastName });
  } catch (error) {
    logger.error(`Signin error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.googleSignin = async (req, res) => {
  const { token, role } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, email, given_name, family_name, picture } = ticket.getPayload();

    let user = await User.findOne({ googleAuthId: sub }) || await User.findOne({ email });
    if (!user) {
      user = new User({
        role: role || 'student',
        firstName: given_name,
        lastName: family_name,
        email,
        googleAuthId: sub,
        password: crypto.randomBytes(16).toString('hex'), // Random password for Google users
        profilePicture: picture,
      });
      await user.save();

      if (role === 'teacher') {
        const teacherProfile = new TeacherProfile({ user: user._id });
        await teacherProfile.save();
      } else {
        const studentProfile = new StudentProfile({ user: user._id });
        await studentProfile.save();
      }
    }

    const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', jwtToken, { httpOnly: true, maxAge: 3600000 });
    logger.info(`Google signin: ${email}`);
    res.json({ token: jwtToken, needsAdditionalDetails: !user.googleAuthId });
  } catch (error) {
    logger.error(`Google signin error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click this link to reset your password: ${resetUrl}\n\nIf you didn’t request this, ignore this email.`,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent to: ${email}`);
    res.json({ message: 'Reset link sent to your email' });
  } catch (error) {
    logger.error(`Forgot password error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password, retypePassword } = req.body;
  if (password !== retypePassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    logger.info(`Password reset for user: ${user.email}`);
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};