const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { body, check } = require('express-validator');
const sanitizeBody = require('../middleware/sanitizeBody');
const validateRequest = require('../middleware/validateRequest');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Debug check
console.log('AuthController methods available:', Object.keys(authController));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many attempts, please try again later',
  skipSuccessfulRequests: true
});

// Input validation
const signupValidation = [
  body('firstName').trim().notEmpty().isLength({ max: 50 }).escape(),
  body('lastName').trim().notEmpty().isLength({ max: 50 }).escape(),
  body('email').trim().isEmail().normalizeEmail(),
  body('password').isLength({ min: 12 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/),
  body('role').optional().isIn(['student', 'teacher', 'admin']),
  body('bio').if(body('role').equals('teacher')).notEmpty().isLength({ min: 10 }),
  body('contactNumber').if(body('role').equals('teacher')).notEmpty().isMobilePhone(),
  body('services').if(body('role').equals('teacher')).optional().isArray(),
  body('languagesSpoken').if(body('role').equals('teacher')).optional(),
  body('tags').if(body('role').equals('teacher')).optional()
];

const signinValidation = [
  body('email').trim().isEmail().normalizeEmail(),
  body('password').notEmpty()
];

// Updated routes with proper error handling
router.post('/signup', 
  authLimiter,
  sanitizeBody(['firstName', 'lastName', 'email']),
  signupValidation,
  validateRequest,
  (req, res, next) => authController.signup(req, res).catch(next)
);

router.post('/signin',
  authLimiter,
  sanitizeBody(['email']),
  signinValidation,
  validateRequest,
  (req, res, next) => authController.signin(req, res).catch(next)
);

router.post('/logout', (req, res, next) => {
  authController.logout(req, res).catch(next);
});

router.post('/google-signin',
  authLimiter,
  body('token').notEmpty(),
  body('role').optional().isIn(['student', 'teacher']),
  validateRequest,
  (req, res, next) => authController.googleSignin(req, res).catch(next)
);

router.post('/forgot-password',
  authLimiter,
  body('email').trim().isEmail().normalizeEmail(),
  validateRequest,
  (req, res, next) => authController.forgotPassword(req, res).catch(next)
);

router.post('/reset-password',
  authLimiter,
  body('token').notEmpty(),
  body('password').isLength({ min: 12 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/),
  validateRequest,
  (req, res, next) => authController.resetPassword(req, res).catch(next)
);

router.get('/verify-email/:token', 
  (req, res, next) => authController.verifyEmail(req, res).catch(next)
);

module.exports = router;

