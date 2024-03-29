const { validate } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const UserModel = require("../models/user");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw { name: "NotEmpty" };
      }

      const newUser = { name, email, password };

      await UserModel.insertUserWithDefaultRole(newUser);

      res.status(201).json({ message: "Account Created" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "NotEmpty" };
      }

      const user = await UserModel.findByEmail(email);

      if (!user || !validate(password, user.password)) {
        throw { name: "InvalidLogin" };
      }

      const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
