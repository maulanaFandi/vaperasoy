const express = require('express');
const router = express.Router();
const admin = require('./admin');
const user = require('./users.js');
const staff = require('./staff.js');
const product = require('./products.js');
const UserController = require('../controllers/user.js');
const auth = require('../middlewares/auth.js');

router.post('/login', UserController.login);

router.post('/register', UserController.register);

router.post('/google-login', UserController.googleLogin);

router.use('/admin', admin);

router.use(staff)

router.use(auth)

router.use(user)

router.use(product)

module.exports = router