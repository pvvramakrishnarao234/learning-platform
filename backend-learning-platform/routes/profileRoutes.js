const express = require('express');
const { createProfile, getProfile, updateProfile, getPublicTeacherProfile } = require('../controllers/profileController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createProfile);
router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateProfile);
router.get('/teacher/:teacherId', getPublicTeacherProfile); // Public route

module.exports = router;