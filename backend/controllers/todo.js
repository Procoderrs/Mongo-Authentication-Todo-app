const connectToDB=require('../utils/conect')
const Todo =require('../models/todoModel');
const createError = require('../utils/error');
const verifyToken = require('../utils/verify')





const getAllTodos = async function (req, res, next) {
await connectToDB();
const todos=await Todo.find({userID:req.user.id})
console.log('Request User ID:', req.user.id); // Check if this matches the database records

res.status(200).send(todos)
  // res.send('Login route');
 };
 
 const getTodos = async function (req, res, next) {
  try{
    await connectToDB();
  console.log('Request User ID:', req.user.id);

  const  todo= await Todo.findById(req.params.id);
  if(!todo) return next(createError(404,'todo not found'));
  if(todo.userID.toString()!== req.user.id)
    return next(createError(404,'not authorized'))
  res.status(200).json(todo);
  }
  catch(error){
      next(createError(404,'todo not found'))
  }


  // res.send('Login route');
  //res.status(200).json({ message: `Get todo with ID: ${req.params.id}` });
 };
 
 const updateTodo = async function (req, res, next) {

  const id=req.params.id;
  if(!req.body) return next(createError(404,'missing fields'))
    try {
      await connectToDB()
      const todo=await Todo.findById(id);
      if(todo.userID.toString()!== req.user.id)
        return next(createError(404,'not authorized'))
     todo.title=req.body.title || todo.title;
     if(req.body.isCompleted!==undefined){
      todo.isCompleted=req.body.isCompleted
     }
     await todo.save();
     res.status(200).json({message:'todo updated'})
    } catch (error) {
      return next (createError(404,'todo not found'))
    }
  // res.send('Login route');
  //res.status(200).json({ message: 'Get all todos' });
 };
 
 const deleteTodo = async function (req, res, next) {

  try{
    await connectToDB();
    const todo=await Todo.deleteOne({
      _id:req.params.id,
      userID:req.user.id
    })
    if(!todo.deletedCount)
       res.status(200).json({message:'todo deleted'})

  }  catch(error){
      return next(createError(400,'todo not found'))

    
  }
  }


  
 const addTodo = async function (req, res, next) {
  // res.send('Login route');
  console.log(req.body);
  if(!req.body || !req.body.title){
    return next(createError(404,'title is required'))
  }
  await connectToDB()
  const newTodo=new Todo({title:req.body.title, userID:req.user.id})
  await newTodo.save();
  res.status(201).json(newTodo)
  //res.send(newTodo);
  
  //res.status(200).json({ message: 'Get all todos' });
 };
 
 
 
 module.exports={getAllTodos,getTodos,updateTodo,deleteTodo,addTodo}