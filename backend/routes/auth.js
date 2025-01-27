const express = require('express');
const { login, register, logout } = require('../controllers/auth'); // Import the controller functions
const verifyToken = require('../utils/verify')

const router = express.Router(); // Correct usage of express.Router()

router.post('/login', login)

router.post('/register', register)

router.post('/logout',logout )





//router.get('/validate',verifyToken)


/* router.get('/validate', verifyToken, (req, res) => {
  // If the token is valid, send success response
  res.status(200).json({ authenticated: true, user: req.user });
}); */




router.get('/api/auth/verify', (req, res, next) => {
  try {
    const token = req.cookies?.access_token; // Token from cookies
    if (!token) {
      return res.status(401).json({ authenticated: false }); // Token missing
    }

    // Verify the token
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        console.log('Token verification failed:', err);
        return res.status(401).json({ authenticated: false });
      }

      // Send user data back if token is valid
      res.status(200).json({ authenticated: true, user });
    });
  } catch (error) {
    console.error('Error during validation:', error);
    next(createError(500, 'Server error'));
  }
});


module.exports = router;
