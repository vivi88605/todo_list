const mongoose = requier('mongoose')
const Schema = mongoose.Schema
const todoShcema = new Schema({
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
  }
})
module.exports = mongoose.model('Todo', todoSchema)