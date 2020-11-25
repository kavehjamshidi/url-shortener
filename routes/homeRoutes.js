const router = require('express').Router();
const {
  home,
  redirectToDestination,
} = require('../controllers/homeController');

router.get('/', home);

router.get('/:id', redirectToDestination);

module.exports = router;
