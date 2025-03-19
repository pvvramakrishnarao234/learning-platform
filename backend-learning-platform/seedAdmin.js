const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');
const logger = require('./config/logger');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      logger.info('Admin user already exists. Skipping seed.');
      process.exit(0);
    }

    // Hash the password
    const password = 'admin123'; // Default password (change this in production)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = new User({
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
    });

    await admin.save();
    logger.info('Admin user created successfully!');
    console.log('Admin Credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');

  } catch (error) {
    logger.error(`Error seeding admin: ${error.message}`);
    process.exit(1);
  } finally {
    // Close MongoDB connection
    mongoose.connection.close();
  }
};

// Run the seeding function
seedAdmin();