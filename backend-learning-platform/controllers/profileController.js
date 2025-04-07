const User = require('../models/User');
const TeacherProfile = require('../models/TeacherProfile');
const StudentProfile = require('../models/StudentProfile');
const logger = require('../config/logger');

const ProfileModel = {
  teacher: TeacherProfile,
  student: StudentProfile
};

// Helper function to get the appropriate profile model based on role
const getProfileModel = (role) => {
  return role === 'teacher' ? TeacherProfile : StudentProfile;
};

exports.createProfile = async (req, res) => {
  const { bio, services } = req.body;
  const { role, id } = req.user;
  const Profile = ProfileModel[role];

  try {
    const existingProfile = await Profile.findOne({ user: id });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    const profileData = role === 'teacher' ? { user: id, bio, services } : { user: id };
    const profile = new Profile(profileData);
    await profile.save();
    
    logger.info(`${role} profile created for user: ${id}`);
    res.status(201).json(profile);
  } catch (error) {
    logger.error(`Profile creation error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's own profile
exports.getProfile = async (req, res) => {
  const { role, id } = req.user;
  const Profile = getProfileModel(role);

  try {
    const profile = await Profile.findOne({ user: id })
      .populate('user', 'firstName lastName email profilePicture')
      .populate(role === 'teacher' ? 'webinarsPosted' : 'webinarsApplied', 'title startTime')
      .populate(role === 'teacher' ? 'coursesPosted' : 'jobsApplied', 'title description')
      .lean();

    if (!profile) {
      // If profile doesn't exist, create a new one
      const newProfile = new Profile({ user: id });
      await newProfile.save();
      
      const populatedProfile = await Profile.findOne({ user: id })
        .populate('user', 'firstName lastName email profilePicture')
        .lean();

      return res.json(populatedProfile);
    }

    res.json(profile);
  } catch (error) {
    logger.error(`Get profile error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get public teacher profile
exports.getPublicTeacherProfile = async (req, res) => {
  const { teacherId } = req.params;
  
  try {
    const profile = await TeacherProfile.findOne({ user: teacherId })
      .populate('user', 'firstName lastName email profilePicture')
      .populate('webinarsPosted', 'title startTime')
      .populate('coursesPosted', 'title description')
      .lean();

    if (!profile) {
      return res.status(404).json({ message: 'Teacher profile not found' });
    }

    res.json(profile);
  } catch (error) {
    logger.error(`Get public teacher profile error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  const { role, id } = req.user;
  const Profile = getProfileModel(role);
  const updateData = req.body;

  try {
    const profile = await Profile.findOne({ user: id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Update only the fields that are provided
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        profile[key] = updateData[key];
      }
    });

    await profile.save();
    
    const updatedProfile = await Profile.findOne({ user: id })
      .populate('user', 'firstName lastName email profilePicture')
      .populate(role === 'teacher' ? 'webinarsPosted' : 'webinarsApplied', 'title startTime')
      .populate(role === 'teacher' ? 'coursesPosted' : 'jobsApplied', 'title description')
      .lean();

    logger.info(`${role} profile updated for user: ${id}`);
    res.json(updatedProfile);
  } catch (error) {
    logger.error(`Update profile error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};
