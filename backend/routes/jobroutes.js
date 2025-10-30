const express = require('express');
// ⬇️ IMPORT ALL CONTROLLER FUNCTIONS ONCE
const { 
    getJobs, 
    createJob, 
    updateJob, 
    deleteJob, 
    getJobAndRecommendations // <-- From the bonus feature 
} = require('../controllers/jobcontroller'); 

const { protect, authorize } = require('../middleware/auth'); 

const router = express.Router();

// ------------------------------------------------------------------
// PUBLIC ROUTES
// ------------------------------------------------------------------

// 1. Browse/Search/Filter/Paginate all jobs
router.get('/', getJobs); 

// 2. View single job and get recommendations
router.get('/:id', getJobAndRecommendations); 

// ------------------------------------------------------------------
// EMPLOYER ROUTES (Protected by JWT and Employer role check)
// ------------------------------------------------------------------

// 3. Create Job
router.post('/', protect, authorize('Employer'), createJob);

// 4. Update Job (Requires ownership check in controller)
router.put('/:id', protect, authorize('Employer'), updateJob);

// 5. Delete Job (Requires ownership check in controller)
router.delete('/:id', protect, authorize('Employer'), deleteJob);

module.exports = router;