const express = require("express");
const router = express.Router();
const User = require("../controllers/user");
const ProductController = require("../controllers/product");

router.get("/public/users", User.getAllUsers)

router.get("/public/products", ProductController.getAllProducts)

module.exports = router