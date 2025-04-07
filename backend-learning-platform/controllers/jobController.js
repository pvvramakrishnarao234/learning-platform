const Job = require("../models/JobPost"); // Assuming Job is a Mongoose model
const asyncHandler = require("express-async-handler");


const getAllJobPosts = asyncHandler(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json(jobs);
});


const getJobPosts = asyncHandler(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json(jobs);
});


const createJobPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  const job = new Job({
    title,
    description,
    createdBy: req.user.id, // Assuming user is authenticated
  });

  await job.save();
  res.status(201).json(job);
});


const updateJobPost = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  if (job.createdBy.toString() !== req.user.id) {
    return res.status(403).json({ error: "Not authorized to update this job" });
  }

  const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
  res.status(200).json(updatedJob);
});


const deleteJobPost = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  if (job.createdBy.toString() !== req.user.id) {
    return res.status(403).json({ error: "Not authorized to delete this job" });
  }

  await job.remove();
  res.status(200).json({ message: "Job deleted successfully" });
});


const applyJobPost = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  if (job.applicants.includes(req.user.id)) {
    return res.status(400).json({ error: "Already applied for this job" });
  }

  job.applicants.push(req.user.id);
  await job.save();

  res.status(200).json({ message: "Job application submitted successfully" });
});

module.exports = {
  getAllJobPosts,
  getJobPosts,
  createJobPost,
  updateJobPost,
  deleteJobPost,
  applyJobPost,
};
