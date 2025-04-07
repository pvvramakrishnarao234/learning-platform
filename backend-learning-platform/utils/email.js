// const nodemailer = require('nodemailer');
// const logger = require('../config/logger');

// Create reusable transporter object using SMTP transport
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: process.env.SMTP_SECURE === 'true',
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   }
// });

// Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     logger.error('SMTP configuration error:', error);
//   } else {
//     logger.info('SMTP server is ready to send emails');
//   }
// });

// const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Learning Platform" <${process.env.SMTP_USER}>`,
//       to,
//       subject,
//       html
//     });

//     logger.info(`Email sent: ${info.messageId}`);
//     return info;
//   } catch (error) {
//     logger.error(`Email sending error: ${error.message}`);
//     throw error;
//   }
// };

// module.exports = { sendEmail }; 