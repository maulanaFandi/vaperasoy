const { db } = require("../config/database");
const { ObjectId } = require("mongodb");

class PurchaseModel {
  static getCollection() {
    return db.collection("Purchases");
  }

  static async createPurchase(
    productId,
    quantity,
    price,
    paymentMethod,
    productData,
    totalPrice
  ) {
    // Jika totalPrice tidak disediakan, hitung berdasarkan price dan quantity
    if (!totalPrice) {
      totalPrice = price * quantity; // Harga tanpa pajak
      switch (paymentMethod) {
        case "Debit":
          totalPrice = 0.9 / 100 * totalPrice + totalPrice; // Tambah pajak 0.9%
          break;
        case "Credit":
          totalPrice = 1.5 / 100 * totalPrice + totalPrice; // Tambah pajak 1.5%
          break;
        case "QRIS":
          totalPrice = 0.6 / 100 * totalPrice + totalPrice; // Tambah pajak 0.6%
          break;
        default:
          break; // Tidak ada pajak untuk metode pembayaran lainnya
      }
    }

    const purchase = {
      product: new ObjectId(productId),
      productData: productData,
      quantity: quantity,
      timestamp: new Date(),
      price: price,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
    };
    return await PurchaseModel.getCollection().insertOne(purchase);
  }

  static async getAllPurchases() {
    return await PurchaseModel.getCollection().find().toArray();
  }
}

module.exports = PurchaseModel;
