const express = require('express');
const router = express.Router();
const Admin = require('../controllers/admin');

// router.post('/login-admin', Admin.login);

router.post('/register-admin', Admin.register);

module.exports = router