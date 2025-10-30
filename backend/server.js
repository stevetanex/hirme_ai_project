const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows cross-origin requests (frontend to backend)
app.use(express.json()); // Body parser for JSON data

// Basic Route (Health Check)
app.get('/', (req, res) => {
    res.send('HireMe AI API is running...');
});

// Set the port
const PORT = process.env.PORT || 5000;

app.listen(
    PORT, 
    console.log(`Server running on port ${PORT}`)
);

// Update backend/server.js

// ... existing imports ...
const authRoutes = require('./routes/autrRoutes'); // <-- NEW IMPORT

// ... existing setup (dotenv.config, connectDB, app.use(cors), app.use(express.json))

// Mount routers
app.use('/api/auth', authRoutes); // <-- NEW LINE: Attach the auth routes

// ... rest of the server code
// Update backend/server.js

// ... existing imports ...
const authRoutes = require('./routes/authroutes');
const jobRoutes = require('./routes/jobroutes'); // <-- NEW IMPORT

// ... existing setup ...

// Mount routers
app.use('/api/auth', authRoutes); 
app.use('/api/jobs', jobRoutes); // <-- NEW LINE: Attach the job routes

// ... rest of the server code