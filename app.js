const express = require('express')//載入express
const mongoose = require('mongoose')//載入mongoose
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')//載入body parser
const app = express()
const methodOverride = require('method-override')//載入method-override
const routes = require('./routes')//引用路由

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

app.use(routes)//導入路由

//設定port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})