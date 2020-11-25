module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  return res
    .status(err.statusCode)
    .render('error', { code: err.statusCode, msg: err.message });
};
