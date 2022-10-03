const express = require("express")
const route = express.Router();

const { createTodo, getTodo, updateTodo, deleteTodo } = require('../controller/todoController')

route.post("/createTodo", createTodo)

route.get('/getTodo', getTodo)

route.put('/updateTodo/:id', updateTodo)

route.delete('/deleteTodo/:id', deleteTodo)

module.exports = route