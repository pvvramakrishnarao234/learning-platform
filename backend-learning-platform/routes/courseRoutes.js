const express = require('express');
const router = express.Router();

// Example route for fetching all courses
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Course routes are working!' });
});

// Example route for creating a course
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Course created successfully!' });
});

module.exports = router;