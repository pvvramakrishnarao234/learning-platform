const express = require('express');
const { createWebinar, getWebinars, applyWebinar } = require('../controllers/webinarController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['teacher']), createWebinar);
router.get('/', getWebinars);
router.post('/:webinarId/apply', authMiddleware, roleMiddleware(['student']), applyWebinar);

module.exports = router;