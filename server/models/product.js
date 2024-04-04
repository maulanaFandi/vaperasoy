const { db } = require("../config/database");
const { ObjectId } = require("mongodb");

class ProductModel {
  static getCollection() {
    return db.collection("Products");
  }

  static async getAllProducts() {
    return await ProductModel.getCollection().find({}).toArray();
  }

  static async getProductById(id) {
    return await ProductModel.getCollection().findOne({
      _id: new ObjectId(id),
    });
  }

  static async createProduct(product) {
    return await ProductModel.getCollection().insertOne(product);
  }

  static async updateProduct(id, product) {
    return await ProductModel.getCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: product }
    );
  }

  static async deleteProduct(id) {
    return await ProductModel.getCollection().deleteOne({
      _id: new ObjectId(id),
    });
  }
}

module.exports = ProductModel;
