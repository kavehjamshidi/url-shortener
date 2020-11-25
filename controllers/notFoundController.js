const AppError = require('../utils/appError');

module.exports = (req, res, next) => {
  next(new AppError("Can't find requested URL.", 404));
};
