//載入express
const express = require('express')
const app = express()

//首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

//設定port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})