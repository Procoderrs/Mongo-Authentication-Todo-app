 const jsontoken=require('jsonwebtoken');
const createError = require('./error');

const verifyToken=async(req,res,next)=>{
  try{
    console.log('cookies received',req.cookies)
    const token=req.cookies?.access_token;


    console.log(token);
    console.log("Token received:", token); // Add logging here
    if(!token){
      //if (!token) return res.status(401).json({ authenticated: false });
      console.log('token missing')
      return next(createError(401,'not authenticated'))
    }
    jsontoken.verify(token,process.env.JWT,(err,user)=>{
      //res.json({authenticated:true,user})
  if(err)return next(createError(403,'token is not valid'));

  /* const currentUser = await User.findById(user.id).select('-password');
  if (!currentUser) return res.status(404).json({ error: 'User not found' });

  res.status(200).json({ authenticated: true, user: currentUser });
 */


  console.log('token verification failed',err)
  console.log('decoded user',user)
  req.user=user;
  console.log('verified user',user)
  next();
    })
  }
  catch(err){
    console.error("Token verification failed:", err);
    res.status(403).json("Invalid or missing token");
  }
}
module.exports=verifyToken; 



/* const jsontoken = require('jsonwebtoken');
const createError = require('./error');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return next(createError(401, 'No token provided'));
    }

    // Extract the token from the header (Bearer <token>)
    const token = authHeader.split(' ')[1];
    
    // Verify the token
    jsontoken.verify(token, process.env.JWT, (err, decoded) => {
      if (err) {
        console.log('Token verification failed:', err);
        return next(createError(403, 'Token is not valid'));
      }

      // Attach the decoded user information to the request object
      req.userId = decoded.id;
      console.log('Verified user:', decoded);
      
      // Proceed to the next middleware
      next();
    });
  } catch (error) {
    console.log('Error during token verification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = verifyToken;
 */