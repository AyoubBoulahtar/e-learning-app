const express = require('express');
const courseController = require('../controllers/courseController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all courses
router.get('/', courseController.course_index);

// Get one course
router.get('/:id', courseController.getCourse, courseController.course_details);

// Create one course
router.post('/', requireAuth, courseController.create_course);

// Update one course
router.patch('/:id', requireAuth, courseController.getCourse, courseController.patch_course);

// Delete one course
router.delete('/:id', requireAuth, courseController.getCourse, courseController.delete_course);



module.exports = router;
