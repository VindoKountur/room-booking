'use strict';
const demo = require('../src/constant/demo');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkInsert('users', demo.user, {})
      .then(() => console.log('demo user created'));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkDelete('users', null, {})
      .then(() => console.log('demo user deleted'));
  },
};
