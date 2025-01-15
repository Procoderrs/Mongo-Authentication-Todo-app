const express = require('express');
const { login, register, logout } = require('../controllers/auth'); // Import the controller functions
const router = express.Router(); // Correct usage of express.Router()

router.post('/login', login)

router.post('/register', register)

router.post('/logout',logout )

module.exports = router;
