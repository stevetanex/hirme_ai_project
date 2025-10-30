// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const getSignedJwtToken = (id, role) => {
    return jwt.sign({ user: { id, role } }, process.env.JWT_SECRET, {
        expiresIn: '30d' // Token valid for 30 days
    });
};

// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await User.create({ name, email, password, role });
        const token = getSignedJwtToken(user._id, user.role);

        res.status(201).json({ success: true, token, role: user.role, id: user._id });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        
        const token = getSignedJwtToken(user._id, user.role);
        res.status(200).json({ success: true, token, role: user.role, id: user._id });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};