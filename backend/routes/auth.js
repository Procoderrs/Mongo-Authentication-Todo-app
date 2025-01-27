const express = require('express');
const { login, register, logout } = require('../controllers/auth'); // Import controller functions


const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

// Add a route for /auth/verify
/* router.get('/verify', verifyToken, (req, res) => {
  try {
    // If token is valid, respond with user info
    res.status(200).json({
      authenticated: true,
      user: req.user, // verifyToken middleware mein `req.user` set hota hai
    });
  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}); */

module.exports = router;
