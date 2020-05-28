const jwt = require('jsonwebtoken');
let blacklist = require('../src/constant/blacklist');

function verifyToken(req, res, next) {
  try {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      req.token = bearerToken;
      // // Set the token
      const payload = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
      req.payload = payload;
      next();
    } else {
      // Forbidden
      // res.sendStatus(403);
      res.json({
        message: 'Tidak terverifikasi, belum login',
      });
    }
  } catch (err) {
    res.send(err);
  }
}

function doingCheck(payload, userRole) {
  const {
    user: { role },
  } = payload;
  return role === userRole;
}

function cekRoleAdmin(req, res, next) {
  if (!doingCheck(req.payload, 'admin')) {
    const message = `Fitur khusus untuk admin`;
    res.json({
      message,
    });
  } else {
    next();
  }
}

function cekBlacklist(req, res, next) {
  if (blacklist.includes(req.token)) {
    res.json({
      message: 'token expired, sudah logout',
    });
  } else {
    next();
  }
}

// LETS SEE IF I NEED THis
// function cekRoleUser(req, res, next) {
//   if (!doingCheck(req.payload, 'user')) {
//     const message = `Fitur khusus untuk user`;
//     res.json({
//       message,
//     });
//   } else {
//     next();
//   }
// }

function notFound(req, res, next) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'mwe hehe' : error.stack,
  });
}

module.exports = {
  verifyToken,
  cekBlacklist,
  cekRoleAdmin,
  notFound,
  errorHandler,
};
