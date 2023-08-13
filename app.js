const express = require('express')//載入express
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')//載入body parser
const app = express()
const methodOverride = require('method-override')//載入method-override
const routes = require('./routes')//引用路由
require('./config/mongoose')//mongoose只需要被執行，不需要回傳參數因此不用設定變數

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))//設定每一筆請求都會透過 methodOverride 進行前置處理

//導入路由
app.use(routes)

//設定port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})