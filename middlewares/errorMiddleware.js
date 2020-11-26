const logger = require('../utils/logger');

// This module handles errors occurring inside express

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  logger.error(err.message, err);
  if (err.isPublic) {
    return res
      .status(err.statusCode)
      .render('error', { code: err.statusCode, msg: err.message });
  }
  return res
    .status(err.statusCode)
    .render('error', { code: err.statusCode, msg: 'Internal server error' });
};
