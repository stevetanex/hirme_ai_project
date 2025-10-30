// backend/routes/jobRoutes.js
const express = require('express');
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobcontroller');
const { protect, authorize } = require('../middleware/auth'); // <-- Import Middleware

const router = express.Router();

// Public route for browsing, searching, filtering, and pagination
router.get('/', getJobs); 

// Employer routes (Protected by JWT and Employer role check)
router.post('/', protect, authorize('Employer'), createJob);
router.put('/:id', protect, authorize('Employer'), updateJob);
router.delete('/:id', protect, authorize('Employer'), deleteJob);

module.exports = router;