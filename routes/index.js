//引用expree與express路由
const express = require('express')
const router = express.Router()
//引入首頁路由
const home = require('./modules/home')
router.use('/', home)//將網址結構符合/字串的request導向home模組
//引入todos
const todoList = require('./modules/todoList')
router.use('/todoList', todoList)//將網址結構符合/todoList字串開頭的導向todoList模組

//匯出路由模組
module.exports = router