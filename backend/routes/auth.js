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


module.exports = router;
