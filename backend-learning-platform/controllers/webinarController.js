const asyncHandler = require('express-async-handler');
const Webinar = require('../models/Webinar'); // Assuming a Webinar model exists

// @desc    Create a new webinar
// @route   POST /api/webinars
// @access  Teacher Only
const createWebinar = asyncHandler(async (req, res) => {
  const { title, description, date, duration } = req.body;
  
  if (!title || !description || !date || !duration) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const webinar = await Webinar.create({
    title,
    description,
    date,
    duration,
    createdBy: req.user.id,
  });

  res.status(201).json({ success: true, webinar });
});

// @desc    Get all webinars (Public route)
// @route   GET /api/webinars/all
// @access  Public
const getAllWebinars = asyncHandler(async (req, res) => {
  const webinars = await Webinar.find();
  res.status(200).json({ success: true, webinars });
});

// @desc    Get webinars created by the authenticated teacher
// @route   GET /api/webinars
// @access  Teacher Only
const getWebinars = asyncHandler(async (req, res) => {
  const webinars = await Webinar.find({ createdBy: req.user.id });
  res.status(200).json({ success: true, webinars });
});

// @desc    Update a webinar
// @route   PUT /api/webinars/:webinarId
// @access  Teacher Only
const updateWebinar = asyncHandler(async (req, res) => {
  const webinar = await Webinar.findById(req.params.webinarId);

  if (!webinar) {
    res.status(404);
    throw new Error('Webinar not found');
  }

  if (webinar.createdBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to update this webinar');
  }

  const updatedWebinar = await Webinar.findByIdAndUpdate(req.params.webinarId, req.body, { new: true });
  res.status(200).json({ success: true, updatedWebinar });
});

// @desc    Delete a webinar
// @route   DELETE /api/webinars/:webinarId
// @access  Teacher Only
const deleteWebinar = asyncHandler(async (req, res) => {
  const webinar = await Webinar.findById(req.params.webinarId);

  if (!webinar) {
    res.status(404);
    throw new Error('Webinar not found');
  }

  if (webinar.createdBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to delete this webinar');
  }

  await webinar.remove();
  res.status(200).json({ success: true, message: 'Webinar deleted' });
});

// @desc    Apply for a webinar (Student only)
// @route   POST /api/webinars/:webinarId/apply
// @access  Student Only
const applyWebinar = asyncHandler(async (req, res) => {
  const webinar = await Webinar.findById(req.params.webinarId);

  if (!webinar) {
    res.status(404);
    throw new Error('Webinar not found');
  }

  if (webinar.applicants.includes(req.user.id)) {
    res.status(400);
    throw new Error('Already applied for this webinar');
  }

  webinar.applicants.push(req.user.id);
  await webinar.save();

  res.status(200).json({ success: true, message: 'Applied successfully' });
});

module.exports = {
  createWebinar,
  getWebinars,
  getAllWebinars,
  updateWebinar,
  deleteWebinar,
  applyWebinar,
};
