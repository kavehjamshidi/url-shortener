const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

process.on('uncaughtException', (err) => {
  server.close(() => process.exit(1));
});

process.on('unhandledRejection', (err) => {
  throw err;
});
