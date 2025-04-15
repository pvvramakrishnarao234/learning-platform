// const nodemailer = require('nodemailer');
// const logger = require('./logger');

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false, // Use TLS
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     logger.error(`Email transporter error: ${error.message}`);
//   } else {
//     logger.info('Email transporter ready');
//   }
// });

// module.exports = transporter;