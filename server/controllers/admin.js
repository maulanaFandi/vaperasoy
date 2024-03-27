const { validate } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const AdminModels = require("../models/admin");

class AdminController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "NotEmpty" };
      }

      const admin = await AdminModels.findByEmail(email);

      if (!admin || !validate(password, admin.password)) {
        throw { name: "InvalidLogin" };
      }

      const token = signToken({ id: admin.id, email: admin.email });

      res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        throw { name: "NotEmpty" };
      }
      //   const findAdmin = await AdminModels.findByEmail(email);

      //   if (findAdmin) {
      //     throw { name: "AlreadyExist" };
      //   }

      const newAdmin = { name, email, password, role };

      const result = await AdminModels.create(newAdmin);
      console.log(result);
      res.status(201).json({ message: "Account Created" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AdminController;
