import Permission from '../models/Permission'

class PermissionController {
  async index(req, res){
    const permissions = await Permission.findAll()

    return res.json({
      permissions
    })
  }
}

export default new PermissionController()