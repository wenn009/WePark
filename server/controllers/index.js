const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/garages', require('./garages'));


module.exports = router;