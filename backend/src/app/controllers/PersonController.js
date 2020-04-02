import Person from '../models/Person'

class PersonController {
  async store(req, res) {
    const { cpf } = req.body

    const personExists = await Person.findOne({ where: { cpf } })

    if(personExists) return (res.status(400).json('Este CPF já está cadastrado'))

    const { id, name } = await Person.create(req.body)
    return res.json({
      id,
      name,
      cpf
    })

  }

  async index(req, res) {
    
    const {cpf} = req.query
    
    const people =  cpf ?
    await Person.findOne({
      where: {cpf}
    })  
    : await Person.findAll()
    
    

    return res.json({
      people
    })
  }
}

export default new PersonController()