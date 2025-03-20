const express = require('express');
const { createJobPost, getJobPosts } = require('../controllers/jobController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['student']), createJobPost);
router.get('/', authMiddleware, roleMiddleware(['student']), getJobPosts);

module.exports = router;