const db = require("../config/database");
const { generate } = require("../helpers/bcrypt");

class AdminModel {
  static getCollection() {
    return db.collection("Admin");
  }

  static async create(args) {
    const { password } = args;

    return await AdminModel.getCollection().insertOne({
      ...args,
      password: generate(password),
    });
  }

  static async findByEmail(email) {
    return await AdminModel.getCollection().findOne({ email: email });
  }
}

module.exports = AdminModel;
