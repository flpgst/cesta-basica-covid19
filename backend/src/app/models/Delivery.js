'use strict';

import Sequelize, { Model } from 'sequelize'

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        person_id: Sequelize.INTEGER,
        user_deliverer_id: Sequelize.INTEGER
      },
      {
        sequelize
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.Person, {
      foreignKey: 'person_id',
      as: 'person'
    })
    this.belongsTo(models.User, {
      foreignKey: 'user_deliverer_id',
      as: 'user_deliverer'
    })
  }


}
    
export default Delivery