const { db } = require("../config/database");
const { ObjectId } = require("mongodb");

class PurchaseModel {
  static getCollection() {
    return db.collection("Purchases");
  }

  static async createPurchase(productId, quantity, price, paymentMethod, productData) {
    const purchase = {
      product: new ObjectId(productId),
      productData: productData,
      quantity: quantity,
      timestamp: new Date(),
      price: price,
      paymentMethod: paymentMethod
    };
    return await PurchaseModel.getCollection().insertOne(purchase);
  }

  static async getAllPurchases() {
    return await PurchaseModel.getCollection().find().toArray();
  }
}

module.exports = PurchaseModel;
