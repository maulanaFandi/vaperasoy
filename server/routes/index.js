const express = require('express');
const router = express.Router();
const admin = require('./admin');
const UserController = require('../controllers/user.js');

router.use('/admin', admin);

router.post('/login', UserController.login);

router.post('/register', UserController.register);

module.exports = router