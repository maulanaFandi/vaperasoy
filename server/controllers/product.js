const ProductModel = require("../models/product");
const PurchaseModel = require("../models/purchase");

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
      const {
        name,
        description,
        price,
        imageUrl,
        category,
        stock,
        brand,
        rating,
      } = req.body;

      const result = await ProductModel.createProduct({
        name,
        description,
        price,
        imageUrl,
        category,
        stock,
        brand,
        rating,
      });
      res.status(201).json(result);
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

  //purchase
  static async createPurchase(req, res, next) {
    try {
      const productId = req.params.id;
      const quantity = req.body.quantity;

      // Dapatkan informasi produk dari database
      const product = await ProductModel.getProductById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Periksa apakah stok mencukupi untuk pembelian
      if (product.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      const price = product.price;
      const paymentMethod = req.body.paymentMethod;
      const productData = product;
      const totalPrice = price * quantity

      await PurchaseModel.createPurchase(
        productId,
        quantity,
        totalPrice,
        paymentMethod,
        productData
      );

      // Kurangi stok produk
      product.stock -= quantity;
      await ProductModel.updateProduct(productId, product);

      res.status(200).json({ message: "Purchase successful" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async getAllPurchases(req, res, next) {
    try {
      const result = await PurchaseModel.getAllPurchases();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ProductController;
