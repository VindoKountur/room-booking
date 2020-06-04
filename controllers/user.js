const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');

let blacklist = require('../src/constant/blacklist');
const saltRound = 10;

async function verifyPassword(password, hashPassword) {
  return bcrypt.compare(password, hashPassword, (err, result) => {
    if (err) throw new Error('error compare');
    console.log(result);
    return result;
  });
}

module.exports = {
  async login(req, res, next) {
    try {
      const { username } = req.body;
      const user = await models.Users.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        res.statusCode = 404;
        throw new Error('Username not found');
      } else {
        const { password } = req.body;
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw new Error('error compare');
          const seed = password === user.password;
          if (!result && !seed) {
            res.statusCode = 400;
            throw new Error('wrong password');
          } else {
            jwt.sign(
              { user },
              process.env.JWT_SECRET_KEY,
              { expiresIn: '12h' },
              (err, token) => {
                res.json({
                  message: 'berhasil login',
                  token,
                  role: user.role,
                  userId: user.id,
                });
              }
            );
          }
        });
      }
    } catch (error) {
      next(error);
    }
  },
  async logout(req, res) {
    const token = req.token;
    blacklist.push(token);
    res.json({
      message: 'berhasil logout',
    });
  },
  async add(req, res, next) {
    try {
      const { username, password, role } = req.body;
      const newUser = {
        username,
        password,
        role,
      };
      const user = await models.Users.create(newUser);
      res.json({
        message: 'user created',
        user,
      });
    } catch (error) {
      next(error);
    }
  },
  async updatePass(req, res, next) {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;
      const user = await models.Users.findOne({
        where: {
          id,
        },
      });
      const compare =
        (await bcrypt.compare(oldPassword, user.password)) ||
        oldPassword === user.password;
      if (!compare) {
        res.statusCode = 400;
        throw new Error('wrong old password');
      }
      const password = await bcrypt.hash(newPassword, saltRound);
      const updatePass = await user.update({ password });
      if (!updatePass) {
        throw new Error('fail update password');
      }
      res.json({
        message: 'updated password',
      });
    } catch (error) {
      next(error);
    }
  },
  async find(req, res, next) {
    try {
      const users = await models.Users.findAll({
        attributes: ['id', 'username', 'role'],
      });
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const { id } = req.params;
      const user = await models.Users.findOne({
        where: {
          id,
        },
        attributes: ['id', 'username', 'role'],
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const user = await models.Users.findOne({
        where: {
          id,
        },
      });
      const update = await user.update({ role });
      if (!update) {
        throw new Error('fail update password');
      }
      res.json({
        message: 'updated',
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await models.Users.findOne({
        where: {
          id,
        },
      });
      const destroy = await user.destroy();
      destroy &&
        res.json({
          message: 'deleted',
        });
    } catch (error) {
      next(error);
    }
  },
};
