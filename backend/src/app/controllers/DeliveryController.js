import Delivery from '../models/Delivery'
import User from '../models/User'
import Person from '../models/Person'
import sequelize from 'sequelize'

class DeliveryController {
  async store(req, res) {
    
    const { cpf } = req.body

    const person = await Person.findOne({
      where: { cpf }
    })

    const lastDelivery = await Delivery.findAll({
      limit: 1,
      where: {
        "person_id": person.id 
      },
      order: [ [ 'createdAt', 'DESC' ]]
    })

    // fazer verificação de 30 dias

    const delivery = {
      "person_id": person.id,
      "user_deliverer_id": req.userId 
    }

    const {id} = await Delivery.create(delivery)

    return res.json({
      id
    })
  }

  async index(req, res) {
    
    const { person_id } = req.query
    
    const whereStatement = {}
    if(person_id) {
      whereStatement.person_id = person_id
    }

    const deliveries = await Delivery.findAll({
      where: { ...whereStatement },
      attributes: ['id', 'created_at'],
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id','name', 'cpf']
        },
        {
          model: User,
          as: 'user_deliverer',
          attributes: ['id','name', 'login']
        }
      ]
    })
    
    return res.json({
      deliveries
    })
  }


}

export default new DeliveryController()