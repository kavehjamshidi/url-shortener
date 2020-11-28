require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');

const homeRoutes = require('./routes/homeRoutes');
const shortenerRoutes = require('./routes/shortenerRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const notFoundController = require('./controllers/notFoundController');
const errorMiddleware = require('./middlewares/errorMiddleware');
const logger = require('./utils/logger');

// Initializing "unhandled promise rejection and uncaugh exception" handler
require('./utils/catchErrors')();

const app = express();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => logger.info(`Connected to DB at ${process.env.DB_URI}`));

app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/about', aboutRoutes);
app.use('/', homeRoutes);
app.use('/api/shortener', shortenerRoutes);

app.all('*', notFoundController);

app.use(errorMiddleware);

module.exports = app;
