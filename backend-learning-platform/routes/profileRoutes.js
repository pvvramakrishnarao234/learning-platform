const express = require('express');
const { check } = require('express-validator');
const {
  getProfile,
  createProfile,
  updateProfile
} = require('../controllers/profileController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation middleware
const validateProfileUpdate = [
  check('bio').optional().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  check('education.*.institution').optional().notEmpty().withMessage('Institution is required'),
  check('education.*.degree').optional().notEmpty().withMessage('Degree is required'),
  check('education.*.fieldOfStudy').optional().notEmpty().withMessage('Field of study is required'),
  check('education.*.startDate').optional().isDate().withMessage('Invalid start date'),
  check('education.*.endDate').optional().isDate().withMessage('Invalid end date'),
  check('skills').optional().isArray().withMessage('Skills must be an array'),
  check('interests').optional().isArray().withMessage('Interests must be an array'),
  check('expertise').optional().isArray().withMessage('Expertise must be an array'),
  check('experience.*.title').optional().notEmpty().withMessage('Title is required'),
  check('experience.*.company').optional().notEmpty().withMessage('Company is required'),
  check('experience.*.from').optional().isDate().withMessage('Invalid start date'),
  check('experience.*.to').optional().isDate().withMessage('Invalid end date')
];

// Routes
router.post('/',createProfile);
router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;
