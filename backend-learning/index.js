const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser')
// const { connectDB, getAuth } = require('./firebase');
const logger = require('./config/logger');
// const connectDB = require('./firebase-admin')
// const errorHandler = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profileRoutes');
// const webinarRoutes = require('./routes/webinarRoutes');
// const jobRoutes = require('./routes/jobRoutes');
// const courseRoutes = require('./routes/courseRoutes');

// Load environment variables
dotenv.config();
logger.info(`JWT_SECRET loaded: ${process.env.JWT_SECRET}`);

// Connect to database
// await connectDB();

// Initialize express app
const app = express();
console.log("Done connecting with Firebase")
// const auth = getAuth();
// console.log(auth)

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(morgan('dev'));
// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/profiles', profileRoutes);
// app.use('/api/webinars', webinarRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/courses', courseRoutes);

// Error Handler
// app.use(errorHandler);

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
global.process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Graceful shutdown on process termination
global.process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => process.exit(0));
});