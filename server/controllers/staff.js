const StaffModel = require("../models/staff");
const { ObjectId } = require("mongodb");

class StaffController {
  static async createStaff(req, res, next) {
    try {
      const {
        name,
        email,
        birthDate,
        phoneNumber,
        gender,
        IDNumber,
        salary,
        address,
      } = req.body;

      if (!name) {
        throw { name: "NameNotEmpty" };
      }

      if (!email) {
        throw { name: "EmailNotEmpty" };
      }

      if (!birthDate) {
        throw { name: "DateNotEmpty" };
      }

      if (!phoneNumber) {
        throw { name: "PhoneNotEmpty" };
      }

      if (!gender) {
        throw { name: "GenderNotEmpty" };
      }

      if (!IDNumber) {
        throw { name: "IDNotEmpty" };
      }

      if (!salary) {
        throw { name: "SalaryNotEmpty" };
      }

      const result = await StaffModel.create({
        name,
        email,
        birthDate,
        phoneNumber,
        gender,
        IDNumber,
        salary,
        address,
      });
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
