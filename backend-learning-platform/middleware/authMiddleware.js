const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    logger.warn('Authentication failed: No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(`Token verification failed: ${error.message}`);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    logger.warn(`Authorization failed: User role ${req.user.role} not allowed`);
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authMiddleware, roleMiddleware };