const express = require('express');
const router = express.Router();

router.use('/garages', require('./garages'));
router.use('/users', require('./users'));
router.use('/', require('./home'));

module.exports = router;