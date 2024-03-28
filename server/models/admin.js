const {db} = require("../config/database");
const { generate } = require("../helpers/bcrypt");

class AdminModel {
  static getCollection() {
    return db.collection("Users");
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

  static async findByRole(Role) {
    return await AdminModel.getCollection().findOne({ role: Role });
  }
}

module.exports = AdminModel;
