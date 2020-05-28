'use strict';

const { intnotnull, datenotnull } = require('../src/constant/model');
module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define(
    'Bookings',
    {
      // user_id: {
      //   type: intnotnull(DataTypes),
      //   references: {
      //     model: {
      //       tableName: 'users',
      //     },
      //     key: 'id',
      //   },
      // },
      dateAndTime: datenotnull(DataTypes),
      // room_id: {
      //   type: intnotnull(DataTypes),
      //   references: {
      //     model: 'rooms',
      //     key: 'id',
      //   },
      // },
    },
    {
      timestamps: false,
    }
  );
  Bookings.associate = function (models) {
    models.Bookings.belongsTo(models.Users, { foreignKey: 'userId' });
    models.Bookings.belongsTo(models.Rooms, { foreignKey: 'roomId' });
  };
  return Bookings;
};
