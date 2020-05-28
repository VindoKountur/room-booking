const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const { room } = require('../controllers');

router
  .route('/')
  .post(
    middlewares.verifyToken,
    middlewares.cekBlacklist,
    middlewares.cekRoleAdmin,
    room.add
  )
  .get(middlewares.verifyToken, room.find);

router.route('/asset').get(room.getAsset);

router
  .route('/:id')
  .get(middlewares.verifyToken, room.get)
  .patch(middlewares.verifyToken, room.update)
  .delete(middlewares.verifyToken, room.delete);

module.exports = router;
