const logger = require('./logger');

// This module handles errors occurring outside of express
module.exports = () => {
  process.on('uncaughtException', (err) => {
    logger.error(err.message, err);
    process.exit(1);
  });

  process.on('unhandledRejection', (err) => {
    throw err;
  });
};
