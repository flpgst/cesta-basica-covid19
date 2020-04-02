'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users', ['permission_id'], {
      type: 'foreign key',
      name: 'users_permissions_fk',
      references: { table: 'permissions', field: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('users', 'users_permissions_fk', {
      references: { table: 'permissions', field: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false
    })
  }
};
