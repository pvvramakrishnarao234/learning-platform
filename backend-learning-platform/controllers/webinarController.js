const Webinar = require('../models/Webinar');
const StudentProfile = require('../models/StudentProfile');
const logger = require('../config/logger');
const { v4: uuidv4 } = require('uuid');

exports.createWebinar = async (req, res) => {
  const { title, description, startTime, endTime, meetLink, tags } = req.body;
  try {
    const webinar = new Webinar({
      title,
      webinarId: uuidv4(),
      description,
      startTime,
      endTime,
      meetLink,
      creator: req.user.id,
      tags: tags || [],
    });
    await webinar.save();
    logger.info(`Webinar created by ${req.user.id}: ${title}`);
    res.status(201).json(webinar);
  } catch (error) {
    logger.error(`Create webinar error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find({ creator: req.user.id }).populate('applicants', 'firstName lastName');
    res.json(webinars);
  } catch (error) {
    logger.error(`Get webinars error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllWebinars = async (req, res) => {
  const { search, date, teacher, tags } = req.query;
  try {
    let query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (date) query.startTime = { $gte: new Date(date) };
    if (teacher) query.creator = teacher;
    if (tags) query.tags = { $in: tags.split(',') };

    const webinars = await Webinar.find(query).populate('creator', 'firstName lastName');
    res.json(webinars);
  } catch (error) {
    logger.error(`Get all webinars error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateWebinar = async (req, res) => {
  const { webinarId } = req.params;
  const updates = req.body;
  try {
    const webinar = await Webinar.findOneAndUpdate(
      { webinarId, creator: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!webinar) return res.status(404).json({ message: 'Webinar not found or unauthorized' });
    logger.info(`Webinar updated by ${req.user.id}: ${webinar.title}`);
    res.json(webinar);
  } catch (error) {
    logger.error(`Update webinar error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteWebinar = async (req, res) => {
  const { webinarId } = req.params;
  try {
    const webinar = await Webinar.findOneAndDelete({ webinarId, creator: req.user.id });
    if (!webinar) return res.status(404).json({ message: 'Webinar not found or unauthorized' });
    logger.info(`Webinar deleted by ${req.user.id}: ${webinar.title}`);
    res.json({ message: 'Webinar deleted' });
  } catch (error) {
    logger.error(`Delete webinar error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.applyWebinar = async (req, res) => {
  const { webinarId } = req.params;
  try {
    const webinar = await Webinar.findOne({ webinarId });
    if (!webinar) return res.status(404).json({ message: 'Webinar not found' });
    if (webinar.applicants.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already applied' });
    }
    webinar.applicants.push(req.user.id);
    await webinar.save();
    await StudentProfile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { webinarsApplied: webinar._id } }
    );
    logger.info(`User ${req.user.id} applied to webinar: ${webinar.title}`);
    res.json({ message: 'Applied successfully' });
  } catch (error) {
    logger.error(`Apply webinar error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};