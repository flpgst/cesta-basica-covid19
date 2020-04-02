const Bcrypt = require('bcryptjs') 

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          login: 'admin',
          permission_id: 1,
          password_hash: await Bcrypt.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {})
  }
}