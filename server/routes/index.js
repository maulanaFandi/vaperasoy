const express = require('express');
const router = express.Router();
const admin = require('./admin');
const user = require('./users.jsx');
const UserController = require('../controllers/user.js');

router.use('/admin', admin);

router.use(user)

router.post('/login', UserController.login);

router.post('/register', UserController.register);

router.post('/google-login', UserController.googleLogin);

module.exports = router