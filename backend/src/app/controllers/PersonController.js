import Person from '../models/Person'
import User from '../models/User'

class PersonController {
  async store(req, res) {
    const { cpf } = req.body

    const personExists = await Person.findOne({ where: { cpf } })

    if(personExists) return (res.status(400).json('Este CPF já está cadastrado'))

    const { id, name } = await Person.create({... req.body, user_creator_id: req.userId})
    return res.json({
      id,
      name,
      cpf
    })

  }

  async index(req, res) {
    
    const {cpf} = req.query
    
    let people =  {}
    
    if(cpf) {
      people = await Person.findOne({
        where: {cpf}
      })
      if(!people) return res.status(400).json({error: "CPF nâo encontrado"}) 
    } else {
      people = await Person.findAll({
        include: [
          {
            model: User,
            as: 'user_creator',
            attributes: ['name']
          }
        ]
      })
    }

    return res.json({
      people
    })
  }
}

export default new PersonController()