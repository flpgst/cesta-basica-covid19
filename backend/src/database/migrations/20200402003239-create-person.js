'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('people', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      family_members: {
        type: Sequelize.INTEGER
      },
      suply_quantity: {
        type: Sequelize.INTEGER
      },
      addr_street: {
        type: Sequelize.STRING
      },
      addr_number: {
        type: Sequelize.STRING
      },
      addr_district: {
        type: Sequelize.STRING
      },
      user_creator_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('people');
  }
};