'use strict';
const demo = require('../src/constant/demo');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkInsert('rooms', demo.room, {})
      .then(() => console.log('demo room created'));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkDelete('rooms', null, {})
      .then(() => console.log('demo rooms deleted'));
  },
};
