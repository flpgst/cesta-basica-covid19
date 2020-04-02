'use strict';

import Sequelize, { Model } from 'sequelize'

class Person extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        family_members: Sequelize.INTEGER,
        addr_street: Sequelize.STRING,
        addr_number: Sequelize.STRING,
        addr_district: Sequelize.STRING,
        suply_quantity: Sequelize.INTEGER,
        user_creator_id: Sequelize.INTEGER
      },
      {
        sequelize
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_creator_id',
      as: 'user_creator'
    })
  }


}
    
export default Person