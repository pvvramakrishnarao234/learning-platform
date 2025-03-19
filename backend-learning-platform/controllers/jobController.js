const JobPost = require('../models/JobPost');
const StudentProfile = require('../models/StudentProfile');
const TeacherProfile = require('../models/TeacherProfile');
const logger = require('../config/logger');

exports.createJob = async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const job = new JobPost({
      title,
      description,
      tags,
      creator: req.user.id,
    });
    await job.save();

    await StudentProfile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { jobsPosted: job._id } }
    );

    logger.info(`Job created by user: ${req.user.id}`);
    res.status(201).json(job);
  } catch (error) {
    logger.error(`Create job error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find().populate('creator', 'firstName lastName');
    res.json(jobs);
  } catch (error) {
    logger.error(`Get jobs error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.applyJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await JobPost.findByIdAndUpdate(
      jobId,
      { $addToSet: { applicants: req.user.id } },
      { new: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found' });

    await TeacherProfile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { jobsApplied: jobId } }
    );

    logger.info(`User ${req.user.id} applied to job: ${jobId}`);
    res.json(job);
  } catch (error) {
    logger.error(`Apply job error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};