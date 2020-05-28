const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const { booking } = require('../controllers');

router
  .route('/')
  .get(middlewares.verifyToken, middlewares.cekBlacklist, booking.find)
  .post(middlewares.verifyToken, middlewares.cekBlacklist, booking.add);

router
  .route('/:id')
  .get(middlewares.verifyToken, middlewares.cekBlacklist, booking.get)
  .delete(middlewares.verifyToken, middlewares.cekBlacklist, booking.delete);

router
  .route('/user/:id')
  .get(middlewares.verifyToken, middlewares.cekBlacklist, booking.findByUser);
module.exports = router;
