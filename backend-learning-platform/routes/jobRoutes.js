const express = require('express');
const { createJob, getJobs, applyJob } = require('../controllers/jobController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['student']), createJob);
router.get('/', getJobs);
router.post('/:jobId/apply', authMiddleware, roleMiddleware(['teacher']), applyJob);

module.exports = router;