const URL = require('../models/urlModel');
const catchAsyncMiddleware = require('../middlewares/catchAsyncMiddleware');

module.exports = catchAsyncMiddleware(async (req, res) => {
  const url = new URL({ url: req.body.url });
  await url.save();

  return res.status(201).render('success', {
    original: url.url,
    short: process.env.DOMAIN_NAME + url.shortUrl,
  });
});
