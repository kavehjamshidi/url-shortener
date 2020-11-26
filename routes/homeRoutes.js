const router = require('express').Router();
const {
  home,
  redirectToDestination,
  favicon,
} = require('../controllers/homeController');

router.get('/', home);

router.get('/favicon.ico', favicon);

router.get('/:id', redirectToDestination);

module.exports = router;
