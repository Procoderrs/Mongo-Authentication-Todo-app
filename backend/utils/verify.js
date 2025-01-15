const jsontoken=require('jsonwebtoken');
const createError = require('./error');

const verifyToken=(req,res,next)=>{
  const token=req.cookies?.access_token;
  console.log(token);
  if(!token){
    return next(createError(401,'not authenticated'))
  }
  jsontoken.verify(token,process.env.JWT,(err,user)=>{
if(err)return next(createError(403,'token is not valid'));
req.user=user;
next();
  })
}
module.exports=verifyToken;