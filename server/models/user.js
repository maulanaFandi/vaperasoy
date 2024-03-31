const { db } = require("../config/database");
const { generate } = require("../helpers/bcrypt");
const {ObjectId} = require('mongodb');

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

  static async getAllUsers() {
    return await UserModel.getCollection().find({}).toArray();
  }

  static async findOrCreateByGoogleId(payload) {
    const { email } = payload;
    let user = await UserModel.findByEmail(email);

    if (!user) {
      const defaultPassword = Math.random().toString(36).slice(-8); // Generate a random password
      const defaultUser = {
        email,
        password: generate(defaultPassword),
      };
      user = await UserModel.create(defaultUser);
    }

    return user;
  }

  static async findById(id) {
    return await UserModel.getCollection().findOne({ _id: new ObjectId(id) });
  }

  static async updateById(id, args) {
    return await UserModel.getCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: args }
    );
  }

  static async deleteById(id) {
    return await UserModel.getCollection().deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = UserModel;
