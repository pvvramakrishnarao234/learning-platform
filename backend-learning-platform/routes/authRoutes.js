const express = require('express');
const {
  signup, signin, googleSignin, forgotPassword, resetPassword,
} = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google-signin', googleSignin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.post('/admin/signin', signin); // Separate route for admin (uses same logic)

module.exports = router;