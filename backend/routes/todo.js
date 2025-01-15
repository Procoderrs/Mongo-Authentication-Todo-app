const express = require('express');
const router = express.Router(); // Correct usage of express.Router()
const {getAllTodos, updateTodo, deleteTodo,getTodos,addTodo}=require('../controllers/todo')
const verifyToken = require('../utils/verify')

console.log({getAllTodos,updateTodo,deleteTodo,getTodos,addTodo})
console.log('verifytoken',verifyToken)

router.get('/', verifyToken, getAllTodos)

router.post('/',verifyToken, addTodo)

router.put('/:id',verifyToken, updateTodo)

router.get("/:id",verifyToken,getTodos)

router.delete('/:id',verifyToken, deleteTodo)


module.exports = router;
