// backend/models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links this job to the User (Employer) who created it
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'Job title is required'],
    },
    description: {
        type: String,
        required: [true, 'Job description is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    skills: {
        type: [String], // Array of strings (e.g., ['React', 'Node.js'])
        required: true,
    },
    salaryRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        default: 'Full-time',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('job', JobSchema);