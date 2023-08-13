const express = require('express')//載入express
const mongoose = require('mongoose')//載入mongoose
const exphbs = require('express-handlebars')
const todoData = require('./models/todo')//載入Todo Model
const bodyParser = require('body-parser')//載入body parser
const app = express()
const methodOverride = require('method-override')//載入method-override

if (process.env.NODE_ENV !== 'production') {//加入這段code 僅在非正式環境時使用dotenv
  require('dotenv').config()
}

//設定連線到MONGODB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true })

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))//設定每一筆請求都會透過 methodOverride 進行前置處理
const db = mongoose.connection// 取得資料庫連線狀態
db.on('error', () => {// 連線異常
  console.log('mongodb error!')
})
db.once('open', () => {// 連線成功
  console.log('mongodb connected!')
})

//首頁路由
app.get('/', (req, res) => {
  todoData.find()//載入Todo Model裡的整包資料
    .lean()//把Mongoose裡的Model物件轉換成乾淨的Javascript資料陣列
    .sort({ _id: 'asc' })//'asc'=ascending,升冪
    .then(todos => res.render('index', { todos }))//{ todos } = { todos:todos } //將todos傳給index樣板
    .catch(error => console.error(error))//錯誤處理
})

app.get('/todoList/new', (req, res) => {
  res.render('new')
})

app.post('/todoList', (req, res) => {
  const name = req.body.name
  return todoData.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/todoList/:id', (req, res) => {
  const id = req.params.id
  return todoData.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})
app.get('/todoList/:id/edit', (req, res) => {
  const id = req.params.id
  return todoData.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
app.put('/todoList/:id', (req, res) => {
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
app.delete('/todoList/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return todoData.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//設定port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})