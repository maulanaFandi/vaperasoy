const StaffModel = require("../models/staff");
const { ObjectId } = require("mongodb");

class StaffController {
  static async createStaff(req, res, next) {
    try {
      const result = await StaffModel.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllStaff(req, res, next) {
    try {
      const result = await StaffModel.getAllStaff();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getStaffById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await StaffModel.findById(id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateStaff(req, res, next) {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const result = await StaffModel.updateById(id, updateData);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteStaff(req, res, next) {
    try {
      const id = req.params.id;
      const result = await StaffModel.deleteById(id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = StaffController;
