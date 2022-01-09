const User = require('../models/User.js');
const AuthController = require('../controllers/AuthController.js');
const express = require('express');

const router = express.Router();

router.get('/login', AuthController.login);

router.get('/register', AuthController.register);
router.post('/register', AuthController.registerPost);

module.exports = router;