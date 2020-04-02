import User from '../models/User'

class UserController {


  async store(req, res) {
    if (!req.admin)
      return res
        .status(403)
        .json({ error: 'Somente administradores podem criar usuários' })
    
    const userExists = await User.findOne({ where: { login: req.body.login } })

    if (userExists) return res.status(400).json({ error: 'Usuário com este login já existe' })
    const { id, name, login } = await User.create(req.body)
    return res.json({
      id,
      name,
      login
    })
  }

  async update(req, res) {
    const { login, oldPassword, password } = req.body

    const user = await User.findByPk(req.userId)

    if (login && login !== user.login) {
      const userExists = await User.findOne({ where: { login } })

      if (userExists)
        return res.status(400).json({ error: 'Usuário já existe' })
    }

    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return res.status(401).json({ error: 'Senha inválida' })

    if (password && !oldPassword) {
      return res.status(401).json({ error: 'Senha antiga não informada' })
    }
    const { id, name } = await user.update(req.body)

    return res.json({
      id,
      name,
      login
    })
  }
}

export default new UserController()
