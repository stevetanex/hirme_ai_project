const mongoose = require('mongoose');
require('dotenv').config(); // Load variables from .env

const connectDB = async () => {
  try {
    // Mongoose reads the MONGO_URI from the process.env object
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    // Exit process with failure if connection fails
    process.exit(1);
  }
};

module.exports = connectDB;