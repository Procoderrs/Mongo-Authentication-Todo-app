const jsontoken=require('jsonwebtoken');
const createError = require('./error');

const verifyToken=(req,res,next)=>{
  try{
    console.log('cookies received',req.cookies)
    const token=req.cookies?.access_token;
    console.log(token);
    console.log("Token received:", token); // Add logging here
    if(!token){
      return next(createError(401,'not authenticated'))
    }
    jsontoken.verify(token,process.env.JWT,(err,user)=>{
  if(err)return next(createError(403,'token is not valid'));
  console.log('decoded user',user)
  req.user=user;
  next();
    })
  }
  catch(err){
    console.error("Token verification failed:", err);
    res.status(403).json("Invalid or missing token");
  }
}
module.exports=verifyToken;