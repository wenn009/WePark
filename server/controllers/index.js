const express = require('express');
const router = express.Router();

router.use('/garages', require('./garages'));
router.use('/user', require('./user'));
router.use('/', require('./home'));

module.exports = router;