const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../config/logger');

/**
 * Authentication middleware that verifies JWT tokens
 */
const authMiddleware = async (req, res, next) => {
  const token = extractToken(req);
  
  if (!token) {
    logger.warn('Authentication attempt without token', { path: req.path });
    return sendUnauthorized(res, 'Authentication token required');
  }

  try {
    const decoded = verifyToken(token);
    const user = await fetchAuthenticatedUser(decoded.id);
    
    if (!user) {
      logger.warn('Token valid but user not found', { userId: decoded.id });
      return sendUnauthorized(res, 'User not found');
    }

    attachUserToRequest(req, user);
    logger.debug('User authenticated', { userId: user._id, role: user.role });
    next();
  } catch (error) {
    handleAuthError(error, res, req);
  }
};

// Helper functions
const extractToken = (req) => {
  return req.cookies?.token || 
         req.headers.authorization?.replace('Bearer ', '') || 
         req.query?.token;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const fetchAuthenticatedUser = async (userId) => {
  return await User.findById(userId)
    .select('-password -__v -refreshToken')
    .lean();
};

const attachUserToRequest = (req, user) => {
  req.user = user;
  req.roles = [user.role]; // For role-based access control
};

const sendUnauthorized = (res, message) => {
  return res.status(401).json({ 
    success: false,
    message,
    code: 'UNAUTHORIZED'
  });
};

const handleAuthError = (error, res, req) => {
  logger.error('Authentication failed', { 
    error: error.message,
    path: req.path,
    stack: error.stack 
  });

  const message = error.name === 'TokenExpiredError' 
    ? 'Token expired' 
    : 'Invalid authentication token';

  res.status(401).json({
    success: false,
    message,
    code: error.name || 'AUTH_ERROR'
  });
};

module.exports = authMiddleware;