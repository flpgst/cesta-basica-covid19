import Delivery from '../models/Delivery'
import User from '../models/User'
import Person from '../models/Person'
import sequelize from 'sequelize'

class DeliveryController {
  async store(req, res) {
    
    const { person_id } = req.query

    const lastDelivery = await Delivery.findAll({
      limit: 1,
      where: { person_id },
      order: [ [ 'createdAt', 'DESC' ]]
    })

    // fazer verificação de 30 dias

    const delivery = {
      person_id,
      "user_deliverer_id": req.userId 
    }

    const {id} = await Delivery.create(delivery)

    return res.json({
      id
    })
  }

  async index(req, res) {
    
    const { person_id } = req.query
    const { cpf } = req.query
    const { last } = req.query
    
    const whereStatement = {}
    if(person_id) {
      whereStatement.person_id = person_id
      
    }
    if(cpf) {
      await Person.findOne({
        where: {cpf},
        attributes: ['id']
      }).then(p => whereStatement.person_id = p.id)
      
    }
    const args = {
      where: { ...whereStatement },
      attributes: ['id', 'created_at'],
      order: [
        ['id', 'DESC'],
      ],    
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
    }


    const deliveries = last ? await Delivery.findOne(args) : await Delivery.findAll(args)
    
    return res.json({
      deliveries
    })
  }


}

export default new DeliveryController()