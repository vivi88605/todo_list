const db = require('../../config/mongoose')
const todoData = require('../todo')//載入todo model


db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    todoData.create({ name: `name-${i}` })
  }
  console.log('todoSeeder is Done')
})

