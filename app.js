//載入express
const express = require('express')
const mongoose = require('mongoose')//載入mongoose
//加入這段code 僅在非正式環境時使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true })//設定連線到MONGODB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

//設定port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})