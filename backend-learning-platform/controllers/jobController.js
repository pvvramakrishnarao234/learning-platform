const JobPost = require('../models/JobPost');
const TeacherProfile = require('../models/TeacherProfile');
const logger = require('../config/logger');
const { v4: uuidv4 } = require('uuid');

exports.createJobPost = async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const jobPost = new JobPost({
      jobId: uuidv4(),
      title,
      description,
      creator: req.user.id,
      tags: tags || [],
    });
    await jobPost.save();
    await StudentProfile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { jobsPosted: jobPost._id } }
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
    const jobPosts = await JobPost.find({ creator: req.user.id }).populate('applicants', 'firstName lastName');
    res.json(jobPosts);
  } catch (error) {
    logger.error(`Get job posts error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllJobPosts = async (req, res) => {
  const { search, date, tags } = req.query;
  try {
    let query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (date) query.createdAt = { $gte: new Date(date) };
    if (tags) query.tags = { $in: tags.split(',') };

    const jobPosts = await JobPost.find(query).populate('creator', 'firstName lastName');
    res.json(jobPosts);
  } catch (error) {
    logger.error(`Get all job posts error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateJobPost = async (req, res) => {
  const { jobId } = req.params;
  const updates = req.body;
  try {
    const jobPost = await JobPost.findOneAndUpdate(
      { jobId, creator: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!jobPost) return res.status(404).json({ message: 'Job post not found or unauthorized' });
    logger.info(`Job post updated by ${req.user.id}: ${jobPost.title}`);
    res.json(jobPost);
  } catch (error) {
    logger.error(`Update job post error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteJobPost = async (req, res) => {
  const { jobId } = req.params;
  try {
    const jobPost = await JobPost.findOneAndDelete({ jobId, creator: req.user.id });
    if (!jobPost) return res.status(404).json({ message: 'Job post not found or unauthorized' });
    logger.info(`Job post deleted by ${req.user.id}: ${jobPost.title}`);
    res.json({ message: 'Job post deleted' });
  } catch (error) {
    logger.error(`Delete job post error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.applyJobPost = async (req, res) => {
  const { jobId } = req.params;
  try {
    const jobPost = await JobPost.findOne({ jobId });
    if (!jobPost) return res.status(404).json({ message: 'Job post not found' });
    if (jobPost.applicants.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already applied' });
    }
    jobPost.applicants.push(req.user.id);
    await jobPost.save();
    await TeacherProfile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { jobsApplied: jobPost._id } }
    );
    logger.info(`User ${req.user.id} applied to job: ${jobPost.title}`);
    res.json({ message: 'Applied successfully' });
  } catch (error) {
    logger.error(`Apply job post error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};