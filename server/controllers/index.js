const express = require('express');
const router = express.Router();

router.use('/location', require('./location'));
router.use('/timesheet', require('./timesheet'));
router.use('/garages', require('./garages'));
router.use('/upload', require('./uploadfile'));
router.use('/user', require('./user'));
router.use('/auth', require('./auth'));
router.use('/', require('./home'));

module.exports = router;