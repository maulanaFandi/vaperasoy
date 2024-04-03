const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product");

router.get("/products", ProductController.getAllProducts);

router.post("/products", ProductController.createProduct);

router.get("/products/:id", ProductController.getProductById);

router.patch("/products/:id", ProductController.updateProduct);

router.delete("/products/:id", ProductController.deleteProduct);

router.put("/products/:id/testimonials", ProductController.createTestimonial);

module.exports = router