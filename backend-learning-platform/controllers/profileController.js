const User = require('../models/User');
const TeacherProfile = require('../models/TeacherProfile');
const StudentProfile = require('../models/StudentProfile');
const logger = require('../config/logger');

exports.createProfile = async (req, res) => {
  const { bio, services } = req.body;
  try {
    if (req.user.role === 'teacher') {
      const profile = new TeacherProfile({ user: req.user.id, bio, services });
      await profile.save();
      logger.info(`Teacher profile created for user: ${req.user.id}`);
      res.status(201).json(profile);
    } else if (req.user.role === 'student') {
      const profile = new StudentProfile({ user: req.user.id });
      await profile.save();
      logger.info(`Student profile created for user: ${req.user.id}`);
      res.status(201).json(profile);
    } else {
      res.status(403).json({ message: 'Invalid role' });
    }
  } catch (error) {
    logger.error(`Profile creation error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    let profile;
    if (req.user.role === 'teacher') {
      profile = await TeacherProfile.findOne({ user: req.user.id }).populate('user', 'firstName lastName email');
    } else if (req.user.role === 'student') {
      profile = await StudentProfile.findOne({ user: req.user.id }).populate('user', 'firstName lastName email');
    }
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    logger.error(`Get profile error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const updates = req.body;
  try {
    let profile;
    if (req.user.role === 'teacher') {
      profile = await TeacherProfile.findOneAndUpdate({ user: req.user.id }, updates, { new: true });
    } else if (req.user.role === 'student') {
      profile = await StudentProfile.findOneAndUpdate({ user: req.user.id }, updates, { new: true });
    }
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    logger.info(`Profile updated for user: ${req.user.id}`);
    res.json(profile);
  } catch (error) {
    logger.error(`Update profile error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};