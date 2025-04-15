const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const logger = require('../config/logger'); // Your logger
const sanitizeBody = require('../middleware/sanitizeBody');
const validateRequest = require('../middleware/validateRequest');
const authController = require('../controllers/authController');

// Rate limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts
  message: 'Too many attempts, please try again later',
  skipSuccessfulRequests: true,
});

// Input validation rules
const signupValidation = [
  body('firstName').trim().notEmpty().isLength({ max: 50 }).escape(),
  body('lastName').trim().notEmpty().isLength({ max: 50 }).escape(),
  body('email').trim().isEmail().normalizeEmail(),
  body('password')
    .isLength({ min: 12 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/)
    .withMessage('Password must be at least 12 characters with uppercase, lowercase, number, and special character'),
  body('role').optional().isIn(['student', 'teacher', 'admin']),
  body('bio').if(body('role').equals('teacher')).notEmpty().isLength({ min: 10 }),
  body('contactNumber').if(body('role').equals('teacher')).notEmpty().isMobilePhone(),
  body('services').if(body('role').equals('teacher')).optional().isArray(),
  body('languagesSpoken').if(body('role').equals('teacher')).optional(),
  body('tags').if(body('role').equals('teacher')).optional(),
];

const signinValidation = [
  body('email').trim().isEmail().normalizeEmail(),
  body('password').notEmpty(),
  body('role').notEmpty().isIn(['student', 'teacher', 'admin']).withMessage('Role must be student, teacher, or admin'),
];

const googleSigninValidation = [
  body('token').notEmpty(),
  body('role').optional().isIn(['student', 'teacher']),
];

const forgotPasswordValidation = [
  body('email').trim().isEmail().normalizeEmail(),
];

const resetPasswordValidation = [
  body('token').notEmpty(),
  body('password')
    .isLength({ min: 12 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/)
    .withMessage('Password must meet complexity requirements'),
];

const wrapController = (controllerFn, actionName) => async (req, res, next) => {
  const requestId = Math.random().toString(36).substring(2, 8);
  logger.info(`[${requestId}] Starting ${actionName} - ${req.method} ${req.path}`);

  try {
    await controllerFn(req, res); // Call the controller
    // Only log success if the response status is 200 or 201
    if (res.statusCode === 200 || res.statusCode === 201) {
      logger.info(`[${requestId}] ${actionName} completed successfully`);
    }
  } catch (error) {
    logger.error(`[${requestId}] ${actionName} failed: ${error.message}`);
    // If the controller didn’t send a response, send a generic 500
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Server error', code: 'SERVER_ERROR' });
    }
  }
};

// Routes with logging and middleware
router.post(
  '/signup',
  authLimiter,
sanitizeBody(['firstName', 'lastName', 'email']),
  signupValidation,
  validateRequest,
  wrapController(authController.signup, 'Signup')
);

router.post(
  '/signin',
  authLimiter,
sanitizeBody(['email']),
  signinValidation,
      validateRequest,
  wrapController(authController.signin, 'Signin')
);

router.post(
  '/logout',
  wrapController(authController.logout, 'Logout')
);

router.post(
  '/google-signin',
  authLimiter,
  googleSigninValidation,
      validateRequest,
  wrapController(authController.googleSignin, 'Google Signin')
);

router.post(
  '/forgot-password',
  authLimiter,
  forgotPasswordValidation,
      validateRequest,
  wrapController(authController.forgotPassword, 'Forgot Password')
);

router.post(
  '/reset-password',
  authLimiter,
  resetPasswordValidation,
      validateRequest,
  wrapController(authController.resetPassword, 'Reset Password')
);

router.get(
  '/verify-email/:token',
  wrapController(authController.verifyEmail, 'Verify Email')
);

module.exports = router;