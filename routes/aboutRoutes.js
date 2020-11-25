const router = require('express').Router();
const about = require('../controllers/aboutController');

router.get('/', about);

module.exports = router;
