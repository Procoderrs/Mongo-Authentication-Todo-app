const mongoose=require('mongoose')

const todoSchema=new mongoose.Schema({
  userID:{
type:mongoose.Schema.Types.ObjectId,
ref:'User',
required:[true,'todo must have a  owner']
  },
  title:{
    type:String,
    required:[true,'must provided title'],
    
  },
  isCompleted:{
    type:Boolean,
    default:false,
  },
});
const Todo=mongoose.model("Todo",todoSchema)
module.exports=Todo;