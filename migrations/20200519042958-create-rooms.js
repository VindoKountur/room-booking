'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Rooms',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        capacity: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        assets: {
          allowNull: false,
          type: Sequelize.STRING,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rooms');
  },
};
