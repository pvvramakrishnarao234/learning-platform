const express = require('express');
const {
  createJobPost,
  getJobPosts,
  getAllJobPosts,
  updateJobPost,
  deleteJobPost,
  applyJobPost,
} = require('../controllers/jobController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['student']), createJobPost);
router.get('/', authMiddleware, roleMiddleware(['student']), getJobPosts);
router.get('/all', getAllJobPosts); // Public route
router.put('/:jobId', authMiddleware, roleMiddleware(['student']), updateJobPost);
router.delete('/:jobId', authMiddleware, roleMiddleware(['student']), deleteJobPost);
router.post('/:jobId/apply', authMiddleware, roleMiddleware(['teacher']), applyJobPost);

module.exports = router;