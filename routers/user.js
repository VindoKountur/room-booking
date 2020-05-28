const express = require('express');
const router = express.Router();

const { verifyToken, cekBlacklist, cekRoleAdmin } = require('../middlewares');
const { user } = require('../controllers');

router.post('/login', user.login);
router.post('/logout', verifyToken, user.logout);

router
  .route('/')
  .get(verifyToken, cekBlacklist, cekRoleAdmin, user.find)
  .post(verifyToken, cekBlacklist, cekRoleAdmin, user.add);

router
  .route('/:id')
  .get(verifyToken, cekBlacklist, cekRoleAdmin, user.get)
  .patch(verifyToken, cekBlacklist, user.update)
  .delete(verifyToken, cekBlacklist, cekRoleAdmin, user.delete);

router.route('/pass/:id').patch(verifyToken, cekBlacklist, user.updatePass);

module.exports = router;
