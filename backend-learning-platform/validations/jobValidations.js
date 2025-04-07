const { check } = require('express-validator');

const jobValidation = {
  createJob: [
    check('title').trim().notEmpty().withMessage('Title is required'),
    check('description').trim().notEmpty().withMessage('Description is required'),
    check('category').trim().notEmpty().withMessage('Category is required'),
    check('salary').isNumeric().withMessage('Salary must be a number'),
  ],

  updateJob: [
    check('title').optional().trim().notEmpty(),
    check('description').optional().trim().notEmpty(),
    check('category').optional().trim().notEmpty(),
    check('salary').optional().isNumeric(),
  ],

  applyJob: [
    check('coverLetter').trim().notEmpty().withMessage('Cover letter is required'),
  ],
};

module.exports = { jobValidation };
