const express = require('express');
const { login, register, logout } = require('../controllers/auth'); // Import controller functions
const verifyToken = require('../utils/verifyToken');
const createError = require('../utils/error');

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

// Validation route
/* router.get('/validate', verifyToken, (req, res) => {
  try {
    // If the token is valid, return success response
    res.status(200).json({ authenticated: true, user: req.user });
  } catch (err) {
    console.error("Validation error:", err);
    next(createError(500, "Server error"));
  }
}); */

module.exports = router;
