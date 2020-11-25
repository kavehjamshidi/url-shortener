const mongoose = require('mongoose');
const validator = require('validator');
const normalizeUrl = require('normalize-url');
const en = require('nanoid-good/locale/en');
const fa = require('nanoid-good/locale/fa');
const nanoid = require('nanoid-good/async').nanoid(en, fa);
const AppError = require('../utils/appError');

const urlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true,
      validate: [validator.isURL, 'Invalid URL'],
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Adding short path to document
urlSchema.pre('validate', async function (next) {
  this.shortUrl = await nanoid(8);
  next();
});

// Normalizing the URL after validation
urlSchema.pre('save', async function (next) {
  this.url = normalizeUrl(this.url);
  next();
});

// Handling validation errors
urlSchema.post('validate', function (err, doc, next) {
  if (err) next(new AppError(err.message, 400));
  next();
});

const URL = mongoose.model('url', urlSchema);
module.exports = URL;
