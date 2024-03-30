const StaffModel = require("../models/staff");

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
      const result = await StaffModel.findById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateStaff(req, res, next) {
    try {
      const result = await StaffModel.updateById(req.params.id, req.body);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteStaff(req, res, next) {
    try {
      const result = await StaffModel.deleteById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = StaffController;
