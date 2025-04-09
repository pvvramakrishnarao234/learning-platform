const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('./models/User');
const connectDB = require('./config/db');
const logger = require('./config/logger');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Check if admin already exists (by email and role)
    const existingAdmin = await User.findOne({ email: 'admin@example.com', role: 'admin' });
    if (existingAdmin) {
      logger.info('Admin user already exists. Skipping seed.');
      process.exit(0);
    }

    // Hash the password with 12 salt rounds (consistent with authController)
    const password = 'AdminPass789!'; // Stronger default password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user with all fields
    const admin = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true, // Admin is pre-verified
      verificationToken: null, // No verification needed
    });

    await admin.save();
    logger.info('Admin user created successfully!', {
      userId: admin._id,
      email: admin.email,
      role: admin.role,
    });
    console.log('Admin Credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: AdminPass789!');

  } catch (error) {
    logger.error(`Error seeding admin: ${error.message}`, { stack: error.stack });
    process.exit(1);
  } finally {
    // Close MongoDB connection
    mongoose.connection.close();
  }
};

// Run the seeding function
seedAdmin();