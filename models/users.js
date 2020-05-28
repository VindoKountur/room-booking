'use strict';
const bcrypt = require('bcrypt');
const { stringnotnull } = require('../src/constant/model');
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      username: stringnotnull(DataTypes, true),
      password: stringnotnull(DataTypes),
      role: stringnotnull(DataTypes),
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: (user) => {
          return bcrypt.hash(user.password, 10).then((hashed) => {
            user.password = hashed;
          });
        },
      },
    }
  );
  Users.associate = function (models) {
    // associations can be defined here
    models.Users.hasMany(models.Bookings);
  };
  return Users;
};
