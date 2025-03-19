const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - Error: ${err.message}`);
  res.status(err.status || 500).json({
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;