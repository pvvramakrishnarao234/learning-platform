const Webinar = require('../models/Webinar');
const TeacherProfile = require('../models/TeacherProfile');
const logger = require('../config/logger');

exports.createWebinar = async (req, res) => {
  const { title, description, startTime, endTime, link } = req.body;
  try {
    const webinar = new Webinar({
      title,
      description,
      startTime,
      endTime,
      link,
      creator: req.user.id,
    });
    await webinar.save();

    await TeacherProfile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { webinarsPosted: webinar._id } }
    );

    logger.info(`Webinar created by user: ${req.user.id}`);
    res.status(201).json(webinar);
  } catch (error) {
    logger.error(`Create webinar error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find().populate('creator', 'firstName lastName');
    res.json(webinars);
  } catch (error) {
    logger.error(`Get webinars error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.applyWebinar = async (req, res) => {
  const { webinarId } = req.params;
  try {
    const webinar = await Webinar.findByIdAndUpdate(
      webinarId,
      { $addToSet: { applicants: req.user.id } },
      { new: true }
    );
    if (!webinar) return res.status(404).json({ message: 'Webinar not found' });

    await StudentProfile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { webinarsApplied: webinarId } }
    );

    logger.info(`User ${req.user.id} applied to webinar: ${webinarId}`);
    res.json(webinar);
  } catch (error) {
    logger.error(`Apply webinar error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};