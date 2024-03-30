const { db } = require("../config/database");

class StaffModel {
  static getCollection() {
    return db.collection("Staff");
  }

  static async getAllStaff() {
    return await StaffModel.getCollection().find({}).toArray();
  }

  static async create(args) {
    return await StaffModel.getCollection().insertOne({
      ...args,
    });
  }

  static async findById(id) {
    return await StaffModel.getCollection().findOne({ _id: id });
  }

  static async deleteById(id) {
    return await StaffModel.getCollection().deleteOne({ _id: id });
  }
}

module.exports = StaffModel;
