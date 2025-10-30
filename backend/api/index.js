// backend/api/index.js
const serverless = require('serverless-http');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../config/db'); // Your existing DB connection
const cors = require('cors');
const authRoutes = require('../routes/autrRoutes');
const jobRoutes = require('../routes/jobroutes');

// Load environment variables (Vercel automatically handles this in settings)
dotenv.config();

// Initialize DB connection (Mongoose handles reconnection in serverless context)
connectDB(); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers (Your existing routes)
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Vercel requires the app to be exported via serverless-http wrapper
module.exports = serverless(app);