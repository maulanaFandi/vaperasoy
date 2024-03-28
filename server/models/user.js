const { db } = require("../config/database");
const { generate } = require("../helpers/bcrypt");

class UserModel {
  static getCollection() {
    return db.collection("Users");
  }

  static async create(args) {
    const { password } = args;

    return await UserModel.getCollection().insertOne({
      ...args,
      password: generate(password),
    });
  }

  static async findByEmail(email) {
    return await UserModel.getCollection().findOne({ email: email });
  }

  static async findByRole(role) {
    return await UserModel.getCollection().findOne({ role: role });
  }

  static async insertUserWithDefaultRole(user) {
    const { password, ...userData } = user;
    const defaultUserRole = "user";
    const defaultUser = {
      ...userData,
      password: generate(password),
      role: defaultUserRole,
    };
    return await UserModel.getCollection().insertOne(defaultUser);
  }
}

module.exports = UserModel;
