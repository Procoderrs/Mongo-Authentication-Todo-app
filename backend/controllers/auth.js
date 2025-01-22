const createError=require('../utils/error')
const connectToDB=require('../utils/conect')
const User=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')



/* const register = async function (req, res, next) {
 // res.send('Login route');}

try {
  const data=req.body;
 console.log(req.body)
 console.log(data)
 


  if(!data?.email || !data?.password) {
  return next(createError(400,'missing fields'))
  
  }


  //res.send('register route')
  await connectToDB() ;



  const alreadyRegisterd=await User.exists({
    email:data.email});
    if(alreadyRegisterd)
      return next(createError(400,'user already exists.'))
      //res.send('register')
      const salt=bcrypt.genSaltSync(10)
      const hash=bcrypt.hashSync(req.body.password,salt)


      const newUser=new User ({...req.body,password:hash });
       await newUser.save()
res.status(201).json({ message: 'user created successfully', user: newUser });
 


} catch (error) {
  
}

} */
 

const register = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    await connectToDB();

    // Check if user already exists
    const alreadyRegistered = await User.exists({ email });
    if (alreadyRegistered) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Create and save the new user
    const newUser = new User({ email, password: hash });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error during registration:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};





const login = async function (req, res, next) {
  const data=req.body;
  console.log(req.body)
  console.log(data)
 
 
   if(!data?.email || !data?.password) {
   return next(createError(400,'missing fields'))
   }
   await connectToDB();
   const user=await User.findOne({email:req.body.email});
   if(!user) return next(createError(400,'invalid credentials'))
    const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password);
  if(!isPasswordCorrect) return next(createError(400,'invalid credentials'));

  const token=jwt.sign({id:user._id},process.env.JWT);
  console.log(token,'token');
res.cookie('access_token',token,{
  httpOnly:true,
  secure:process.env.NODE_ENV=== 'production',
  sameSite:'None',
  maxAge: 24 * 60 * 60 * 1000,
}).status(200).json('user logged in')
console.log('line 109',req.cookies); // Log the cookies to see if the token is there

  //res.send('Register route');
};

const logout = async function (req, res, next) {

  res.clearCookie('access_token',{
    httpOnly:true,
    secure: true, // Ensures cookies are only sent over HTTPS
  sameSite: 'None',
  
    secure:process.env.NODE_ENV==='production',
  }).status(200).json({message:'logged out successsfully'})
  //res.send('Logout route');
};

module.exports = { login, register, logout };
