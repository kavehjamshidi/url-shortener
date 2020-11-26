// This module handles promise rejections occurring inside express route handlers

module.exports = (handler) => {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
};
