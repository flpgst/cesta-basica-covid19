import Sequelize from 'sequelize'


// import Permission from '../app/models/Permission'
import User from '../app/models/User'
import Person from '../app/models/Person'
import Delivery from '../app/models/Delivery'
import Permission from '../app/models/Permission'
import databaseConfig from '../config/database'

const models = [User, Person, Delivery, Permission]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)
    models.map(model => model.init(this.connection))
    models.map(
      model => model.associate && model.associate(this.connection.models)
    )
  }

}

export default new Database()
