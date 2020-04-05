import sequelize from 'sequelize'
import {parseISO, differenceInCalendarDays } from 'date-fns'
import Delivery from '../models/Delivery'
import User from '../models/User'
import Person from '../models/Person'

class DeliveryController {
  async store(req, res) {
    
    const { person_id } = req.body

    const lastDelivery = await Delivery.findAll({
      limit: 1,
      where: { person_id },
      order: [ [ 'createdAt', 'DESC' ]]
    })

    const deliveryRange = lastDelivery[0] && differenceInCalendarDays(new Date(), lastDelivery[0].createdAt)
    if (deliveryRange <= 30)
      return res.status(400).json(`Faltam ${30 - deliveryRange} dias para a próxima entrega ser liberada!`)

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


    const test = await Delivery.findAll({
      where: { person_id },
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

    const deliveries = last ? await Delivery.findAll({...args, limit:1}) : await Delivery.findAll(args)
    
    return res.json({
      deliveries
    })
  }


}

export default new DeliveryController()