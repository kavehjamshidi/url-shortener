const router = require('express').Router();
const shortener = require('../controllers/shortenerController');

router.post('/', shortener);

module.exports = router;
