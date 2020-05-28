'use strict';

const { stringnotnull, intnotnull } = require('../src/constant/model');
module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define(
    'Rooms',
    {
      name: stringnotnull(DataTypes),
      description: stringnotnull(DataTypes),
      capacity: intnotnull(DataTypes),
      assets: stringnotnull(DataTypes),
    },
    {
      timestamps: false,
    }
  );
  Rooms.associate = function (models) {
    // associations can be defined here
    models.Rooms.hasMany(models.Bookings);
  };
  return Rooms;
};
