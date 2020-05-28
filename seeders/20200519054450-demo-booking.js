'use strict';
const demo = require('../src/constant/demo');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkInsert('bookings', demo.booking, {})
      .then(() => console.log('demo room created'));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkDelete('bookings', null, {})
      .then(() => console.log('demo booking deleted'));
  },
};
