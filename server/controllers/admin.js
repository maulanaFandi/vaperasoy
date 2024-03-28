const AdminModels = require("../models/admin");

class AdminController {
  static async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        throw { name: "NotEmpty" };
      }

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
