const { ObjectId } = require("mongodb");
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

  static async updateById(id, updateData) {
    return await StaffModel.getCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
  }

  static async findById(id) {
    return await StaffModel.getCollection().findOne({ _id: new ObjectId(id) });
  }

  static deleteById(id) {
    return StaffModel.getCollection().deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = StaffModel;
