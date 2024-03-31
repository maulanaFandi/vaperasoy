const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

router.get('/users', User.getAllUsers)

router.get('/users/:id', User.getUserById)

router.put('/users/:id', User.updateUser)

router.delete('/users/:id', User.deleteUser)

module.exports = router