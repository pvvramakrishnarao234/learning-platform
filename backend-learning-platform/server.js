require('dotenv').config(); // Add this at the top
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const webinarRoutes = require('./routes/webinarRoutes');
const jobRoutes = require('./routes/jobRoutes');
const connectDB = require('./config/db');
const logger = require('./config/logger');

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/webinars', webinarRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));