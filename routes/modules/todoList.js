//引用express與express路由
const express = require('express')
const router = express.Router()

const todoData = require('../../models/todo')//引用Todo Model

//設定路由
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('', (req, res) => {
  const name = req.body.name
  return todoData.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return todoData.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return todoData.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  /* = 
  const name = req.body.name
  const isDone = req.body.isDone 
  */
  return todoData.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      /* =
      if(isDone==='on'){
        todo.isDone = true;
      }else{
        todo.isDone = false;
      }
      */
      return todo.save()
    })
    .then(() => res.redirect(`/todoList/${id}`))
    .catch(error => console.log(error))
})
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return todoData.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//匯出路由模組
module.exports = router