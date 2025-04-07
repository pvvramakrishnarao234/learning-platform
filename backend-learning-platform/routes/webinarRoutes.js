const express = require('express');
const {
  createWebinar,
  getWebinars,
  getAllWebinars,
  updateWebinar,
  deleteWebinar,
  applyWebinar,
} = require('../controllers/webinarController');
const  authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['teacher']), createWebinar);
router.get('/', authMiddleware, roleMiddleware(['teacher']), getWebinars);
router.get('/all', getAllWebinars); // Public route
router.put('/:webinarId', authMiddleware, roleMiddleware(['teacher']), updateWebinar);
router.delete('/:webinarId', authMiddleware, roleMiddleware(['teacher']), deleteWebinar);
router.post('/:webinarId/apply', authMiddleware, roleMiddleware(['student']), applyWebinar);

module.exports = router;