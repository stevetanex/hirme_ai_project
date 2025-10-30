// backend/controllers/jobController.js
const Job = require('../models/job');

// @desc    Get all jobs (with filtering and pagination)
// @route   GET /api/jobs
// @access  Public (Job Seeker Browse)
exports.getJobs = async (req, res, next) => {
    try {
        const { title, skills, minSalary, maxSalary, location, page = 1, limit = 10 } = req.query;
        const query = {};

        // 1. Filtering Logic (Required: title, skills, salary range, location)
        if (title) query.title = { $regex: title, $options: 'i' }; 
        if (location) query.location = { $regex: location, $options: 'i' }; 
        
        // Skills filtering (matching ANY of the provided comma-separated skills)
        if (skills) {
            query.skills = { $in: skills.split(',').map(s => new RegExp(s.trim(), 'i')) };
        }
        
        // Salary Range Filtering (Finding jobs that fall within the seeker's range)
        if (minSalary || maxSalary) {
            query.$and = [
                // Check if job's max salary is >= the minimum required salary
                { 'salaryRange.max': { $gte: Number(minSalary || 0) } } 
            ];
            if (maxSalary) {
                // Check if job's min salary is <= the maximum desired salary
                query.$and.push({ 'salaryRange.min': { $lte: Number(maxSalary) } });
            }
        }

        // 2. Pagination Logic
        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);
        const skip = (pageNumber - 1) * pageSize;

        const jobs = await Job.find(query)
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: -1 });

        const totalJobs = await Job.countDocuments(query);
        const totalPages = Math.ceil(totalJobs / pageSize);

        res.json({
            success: true,
            count: totalJobs,
            page: pageNumber,
            pages: totalPages,
            data: jobs
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Create new job post
// @route   POST /api/jobs
// @access  Private (Employer only)
exports.createJob = async (req, res, next) => {
    try {
        // Attach the Employer's ID from the JWT token
        req.body.employer = req.user.id;
        
        const job = await Job.create(req.body);
        res.status(201).json({ success: true, data: job });
    } catch (err) {
        // Handle Mongoose validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Update a job post
// @route   PUT /api/jobs/:id
// @access  Private (Employer and Owner only)
exports.updateJob = async (req, res, next) => {
    try {
        let job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ msg: `Job not found with id of ${req.params.id}` });
        }

        // Ensure user is job owner (Crucial Security Check)
        if (job.employer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized to update this job' });
        }

        job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: job });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a job post
// @route   DELETE /api/jobs/:id
// @access  Private (Employer and Owner only)
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ msg: `Job not found with id of ${req.params.id}` });
        }

        // Ensure user is job owner (Crucial Security Check)
        if (job.employer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized to delete this job' });
        }

        await job.deleteOne(); 

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};