// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

// 1. Protection Middleware: Checks for a valid JWT
exports.protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Get token from header: "Bearer <token>"
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ msg: 'Not authorized to access this route. No token provided.' });
    }

    try {
        // Verify token against JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user info (ID and Role) to the request object
        req.user = decoded.user; // { id: userId, role: userRole }
        
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid or expired.' });
    }
};

// 2. Authorization Middleware: Checks if the user has the required role
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                msg: `User role ${req.user.role} is not authorized to perform this action.` 
            });
        }
        next();
    };
};