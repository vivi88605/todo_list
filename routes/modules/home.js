//引用express與express路由
const express = require('express')
const router = express.Router()

const todoData = require('../../models/todo')//引用Todo Model

//首頁路由
router.get('/', (req, res) => {
  todoData.find()//載入Todo Model裡的整包資料
    .lean()//把Mongoose裡的Model物件轉換成乾淨的Javascript資料陣列
    .sort({ _id: 'asc' })//'asc'=ascending,升冪
    .then(todos => res.render('index', { todos }))//{ todos } = { todos:todos } //將todos傳給index樣板
    .catch(error => console.error(error))//錯誤處理
})

//匯出路由模組
module.exports = router