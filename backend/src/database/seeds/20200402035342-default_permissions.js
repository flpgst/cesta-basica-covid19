module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'permissions',
      [
        {
          name: 'admin',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'cadastro',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'entrega',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('permissions', null, {})
  }
}