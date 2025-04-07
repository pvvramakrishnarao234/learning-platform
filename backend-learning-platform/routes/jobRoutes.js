const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware= require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const jobValidation = require('../validations/jobValidations');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public routes
router.get('/all', jobController.getAllJobPosts);

// Student-protected routes
router.post(
  '/',
  authMiddleware,
  roleMiddleware('student'),
  validateRequest,
  jobController.createJobPost
);

router.get(
  '/',
  authMiddleware,
  roleMiddleware('student', 'teacher'), // Allow both students and teachers
  jobController.getJobPosts
);

router.put(
  '/:jobId',
  authMiddleware,
  roleMiddleware('student'),
  validateRequest,
  jobController.updateJobPost
);

router.delete(
  '/:jobId',
  authMiddleware,
  roleMiddleware('student'),
  jobController.deleteJobPost
);

// Teacher-specific route
router.post(
  '/:jobId/apply',
  authMiddleware,
  roleMiddleware('teacher'),
  validateRequest,
  jobController.applyJobPost
);

module.exports = router;