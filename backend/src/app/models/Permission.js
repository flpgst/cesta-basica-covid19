'use strict';

import Sequelize, { Model } from 'sequelize'

class Permission extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING
      },
      {
        sequelize
      }
    )
  }
}

export default Permission