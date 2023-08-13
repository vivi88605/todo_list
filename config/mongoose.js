const mongoose = require('mongoose')//載入mongoose

//加入這段code 僅在非正式環境時使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//設定連線到MONGODB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection// 取得資料庫連線狀態
db.on('error', () => {// 連線異常
  console.log('mongodb error!')
})
db.once('open', () => {// 連線成功
  console.log('mongodb connected!')
})

//匯出模組
module.exports = db