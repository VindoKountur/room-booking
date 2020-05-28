'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Bookings',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        dateAndTime: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        roomId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookings');
  },
};
