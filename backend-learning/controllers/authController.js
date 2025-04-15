const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
// const User = require('../models/User');
// const TeacherProfile = require('../models/TeacherProfile');
// const StudentProfile = require('../models/StudentProfile');
const logger = require('../config/logger');
const { sendEmail } = require('../utils/email');
const { db, auth } = require('../firebase');
require('dotenv').config();
// connectDB();
// const auth = getAuth();
// const db = getDB();
// console.log(auth)
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


//  HANDLE THIS IN TEACHER PROFILE AND STUDENT PROFILE!!!
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
  id: user.uid,
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
    // console.log(auth);
    try {
      // Try to fetch the user by email
      await auth.getUserByEmail(normalizedEmail);
      // If the above line didn't throw, it means a user exists
      return res.status(409).json({ 
        message: 'User already exists', 
        code: 'USER_EXISTS'
      });
    } catch (error) {
      // If error code indicates the user is not found, the email is available
      if (error.code === 'auth/user-not-found') {
        // Continue with your flow for creating a new user, e.g.:
        // const newUser = await auth.createUser({...});
        // ...
      } else {
        // For any other errors, handle them accordingly
        console.error('Error fetching user:', error);
        return res.status(500).json({ 
          message: 'An error occurred while checking user existence',
          code: error.code,
        });
      }
    }
    // const existingUser = await User.findOne({ email: normalizedEmail, role });
    // if (existingUser) {
    //   logger.warn(`Signup attempt with existing email and role: ${normalizedEmail}, ${role}`);
    //   return res.status(409).json({ message: 'User already exists', code: 'USER_EXISTS' });
    // }

    logger.info(`Signup password input: ${password}`, { email: normalizedEmail, role });
    // const hashedPassword = await bcrypt.hash(password, 12);
    // logger.info(`Hashed password: ${hashedPassword}`, { email: normalizedEmail, role });

    // const user = await User.create({
    //   firstName,
    //   lastName,
    //   email: normalizedEmail,
    //   password: hashedPassword,
    //   role,
    //   verificationToken: crypto.randomBytes(32).toString('hex'),
    // });

    const userRecord = await auth.createUser({
      email: normalizedEmail,
      password: password
    });

    const _ = await db.collection('users').doc(userRecord.uid).set({
      firstName: firstName,
      lastName: lastName,
      role: role,
      verificationToken: crypto.randomBytes(32).toString('hex'),
    });
    const userDetailsRef = await getDocument('users', userRecord.uid)
    console.log(userDetailsRef);
    const user = { uid: userRecord.uid, email: userRecord.email, ...userDetailsRef };
    console.log("User Data: ", user);
    // HANDLE
    // await handleProfileCreation(role, userRecord.uid, profileData);

    const token = generateAuthToken(userRecord.uid, userRecord.role);
    setAuthCookie(res, token);

    // if (process.env.SEND_EMAILS === 'true') {
    //   sendEmail(
    //     userRecord.email,
    //     `Please verify your email: ${process.env.FRONTEND_URL}/verify-email/${user.verificationToken}`
    //   );
    //   logger.info(`Verification email sent to ${user.email}`, { userId: user._id });
    // }

    // console.log(transformUserResponse(user));

    logger.info(`User signed up successfully`, { userId: userRecord.uid, role });
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

async function getDocument(collectionName, documentId) {
  try {
    const docRef = db.collection(collectionName).doc(documentId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.log('No such document!');
      return null;
    } else {
      // console.log('Document data:', docSnap.data());
      return docSnap.data();
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}

exports.signin = async (req, res) => {
  // console.log(req.body)
  const { email, role } = req.body;
  if (!role || !['student', 'teacher', 'admin'].includes(role)) {
    logger.warn(`Signin attempt failed: Invalid or missing role for ${email}`);
    return res.status(400).json({ message: 'Role is required and must be student, teacher, or admin', code: 'INVALID_ROLE' });
  }

  try {
    let userRecord, userDetails, user;
    try {
      // Try to fetch the user by email
      const normalizedEmail = email.toLowerCase().trim();
      userRecord = await auth.getUserByEmail(normalizedEmail);
      userDetails = await getDocument('users', userRecord.uid);
      user = { uid: userRecord.uid, email: userRecord.email, ...userDetails };
      console.log(user);
      
      // If the above line didn't throw, it means a user exists
    } catch (error) {
      // If error code indicates the user is not found, the email is available
      if (error.code === 'auth/user-not-found') {
        logger.warn(`Signin failed: No user found`);
        return res.status(401).json({ message: 'Invalid credentials or role' });
      }else{
        console.log(error);
      }
    }

    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    // console.log("Backend Token: ", token)
    try {
      const decodedToken = await auth.verifyIdToken(token);
      // console.log(decodedToken)
      req.user = decodedToken;
      // next();
    } catch (err) {
      console.log("Invalid Firebase Token");
      // console.log(err);
      return res.status(401).json({ message: 'Invalid Firebase token' });
    }

    // const token = generateAuthToken(user.uid, user.role);
    setAuthCookie(res, token);

    logger.info(`User signed in`, { userId: user.uid, role: user.role });
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

// exports.googleSignin = async (req, res) => {
//   const { token: googleToken, role = 'student' } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: googleToken,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const { sub, email, given_name, family_name } = ticket.getPayload();

//     let user = await User.findOne({ $or: [{ googleAuthId: sub }, { email: email.toLowerCase() }] });
//     if (!user) {
//       user = await User.create({
//         role,
//         firstName: given_name,
//         lastName: family_name,
//         email: email.toLowerCase(),
//         googleAuthId: sub,
//         password: crypto.randomBytes(32).toString('hex'), // Random password for Google users
//         isVerified: true,
//       });
//       await handleProfileCreation(role, user._id, {});
//     } else if (!user.googleAuthId) {
//       user.googleAuthId = sub;
//       await user.save();
//     }

//     const token = generateAuthToken(user._firefoxId, user.role);
//     setAuthCookie(res, token);

//     logger.info(`Google signin successful`, { userId: user._id });
//     return res.json({
//       message: 'Google signin successful',
//       user: transformUserResponse(user),
//       token,
//     });
//   } catch (error) {
//     logger.error(`Google signin failed: ${error.message}`, { stack: error.stack });
//     return res.status(500).json({ message: 'Google signin failed', code: 'SERVER_ERROR' });
//   }
// };

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

// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       // Don't reveal if email exists for security
//       return res.json({ message: 'If the email exists, a reset link has been sent' });
//     }

//     const resetToken = crypto.randomBytes(32).toString('hex');
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
//     await sendEmail({
//       to: user.email,
//       subject: 'Password Reset Request',
//       text: `Reset your password here: ${resetUrl}`,
//     });

//     logger.info(`Password reset requested`, { userId: user._id });
//     return res.json({ message: 'If the email exists, a reset link has been sent' });
//   } catch (error) {
//     logger.error(`Forgot password failed: ${error.message}`, { stack: error.stack });
//     return res.status(500).json({ message: 'Reset request failed', code: 'SERVER_ERROR' });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   const { token, password } = req.body;

//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired reset token', code: 'INVALID_TOKEN' });
//     }

//     user.password = await bcrypt.hash(password, 12);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     logger.info(`Password reset successful`, { userId: user._id });
//     return res.json({ message: 'Password reset successful' });
//   } catch (error) {
//     logger.error(`Reset password failed: ${error.message}`, { stack: error.stack });
//     return res.status(500).json({ message: 'Reset password failed', code: 'SERVER_ERROR' });
//   }
// };

// exports.verifyEmail = async (req, res) => {
//   const { token } = req.params;

//   try {
//     const user = await User.findOne({ verificationToken: token });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired verification token', code: 'INVALID_TOKEN' });
//     }

//     user.isVerified = true;
//     user.verificationToken = undefined;
//     await user.save();

//     const authToken = generateAuthToken(user._id, user.role);
//     setAuthCookie(res, authToken);

//     logger.info(`Email verified`, { userId: user._id });
//     return res.json({
//       message: 'Email verified successfully',
//       user: transformUserResponse(user),
//       token: authToken,
//     });
//   } catch (error) {
//     logger.error(`Email verification failed: ${error.message}`, { stack: error.stack });
//     return res.status(500).json({ message: 'Verification failed', code: 'SERVER_ERROR' });
//   }
// };