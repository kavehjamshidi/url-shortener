const URL = require('../models/urlModel');
const catchAsyncMiddleware = require('../middlewares/catchAsyncMiddleware');

const home = (req, res) => {
  return res.status(200).render('home.ejs');
};

const redirectToDestination = catchAsyncMiddleware(async (req, res, next) => {
  const originalUrl = await URL.findOne({ shortUrl: req.params.id });
  if (originalUrl) {
    return res.redirect(originalUrl.url);
  }
  next();
});

module.exports = { home, redirectToDestination };
