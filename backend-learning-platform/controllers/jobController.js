const JobPost = require('../models/JobPost');
const StudentProfile = require('../models/StudentProfile');
const logger = require('../config/logger');

exports.createJobPost = async (req, res) => {
  const { title, description } = req.body;
  try {
    const jobPost = new JobPost({ title, description, creator: req.user.id });
    await jobPost.save();
    await StudentProfile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { jobsPosted: jobPost._id } },
      { new: true }
    );
    logger.info(`Job post created by ${req.user.id}: ${title}`);
    res.status(201).json(jobPost);
  } catch (error) {
    logger.error(`Create job post error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find({ creator: req.user.id });
    res.json(jobPosts);
  } catch (error) {
    logger.error(`Get job posts error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};