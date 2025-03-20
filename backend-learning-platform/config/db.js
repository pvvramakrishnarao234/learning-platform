const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is not defined in .env');
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('MongoDB Connected: ' + mongoose.connection.host);
  } catch (error) {
    logger.error('MongoDB Connection Error: ' + error.message);
    process.exit(1);
  }
};

module.exports = connectDB;