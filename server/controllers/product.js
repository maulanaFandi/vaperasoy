const ProductModel = require("../models/product");

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const result = await ProductModel.getAllProducts();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await ProductModel.getProductById(id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const product = req.body;
      const result = await ProductModel.createProduct(product);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const id = req.params.id;
      const product = req.body;
      const result = await ProductModel.updateProduct(id, product);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;
      const result = await ProductModel.deleteProduct(id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createTestimonial(req, res, next) {
    try {
      const id = req.params.id;
      const product = req.body;
      const result = await ProductModel.updateProduct(id, product);
      res.status(200).json(result);
      
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ProductController;
