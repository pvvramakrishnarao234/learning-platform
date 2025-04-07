const logger = require('../config/logger');

const roleMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
    // 1. Verify user exists (authentication completed)
    if (!req.user) {
      logger.warn('Role check failed - no user', { path: req.path });
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'UNAUTHORIZED'
      });
    }

    // 2. Check if user has required role
    if (!allowedRoles.includes(req.user.role)) {
      logger.warn('Role access denied', {
        userId: req.user._id,
        userRole: req.user.role,
        requiredRoles: allowedRoles,
        path: req.path
      });
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
        code: 'FORBIDDEN',
        requiredRoles: allowedRoles,
        currentRole: req.user.role
      });
    }

    // 3. Role check passed
    logger.debug('Role access granted', {
      userId: req.user._id,
      role: req.user.role,
      path: req.path
    });
    next();
  };
};

module.exports = roleMiddleware;