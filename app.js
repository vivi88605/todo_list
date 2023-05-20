const express = require('express')//載入express
const mongoose = require('mongoose')//載入mongoose
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')//載入Todo Model
const bodyParser = require('body-parser')//載入body parser

if (process.env.NODE_ENV !== 'production') {//加入這段code 僅在非正式環境時使用dotenv
  require('dotenv').config()
}
const app = express()

//設定連線到MONGODB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true })

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
const db = mongoose.connection// 取得資料庫連線狀態
db.on('error', () => {// 連線異常
  console.log('mongodb error!')
})
db.once('open', () => {// 連線成功
  console.log('mongodb connected!')
})

//首頁路由
app.get('/', (req, res) => {
  Todo.find()//載入Todo Model裡的整包資料
    .lean()//把Mongoose裡的Model物件轉換成乾淨的Javascript資料陣列
    .then(todos => res.render('index', { todos }))//{ todos } = { todos:todos } //將todos傳給index樣板
    .catch(error => console.error(error))//錯誤處理
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//設定port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})