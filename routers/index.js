const express = require('express');
const router = express.Router();

router.use('/room', require('./room'));
router.use('/user', require('./user'));
router.use('/booking', require('./booking'));

module.exports = router;
