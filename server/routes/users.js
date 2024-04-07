const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

router.get('/users', User.getAllUsers)

router.get('/users/profile', User.getProfile)

router.put('/users/profile', User.updateProfile)

router.patch('/users/testimony', User.updateTestimony)

router.get('/users/:id', User.getUserById)

router.delete('/users/:id', User.deleteUser)


module.exports = router