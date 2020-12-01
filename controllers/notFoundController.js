const AppError = require('../utils/appError');

module.exports = (req, res, next) => {
  return next(new AppError('Cannot find requested URL.', 404));
};
