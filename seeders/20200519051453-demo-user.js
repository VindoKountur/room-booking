'use strict';
const demo = require('../src/constant/demo');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkInsert('Users', demo.user, {})
      .then(() => console.log('demo user created'));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkDelete('Users', null, {})
      .then(() => console.log('demo user deleted'));
  },
};
