const { validate } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const UserModel = require("../models/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async register(req, res, next) {
    try {
      const {
        name,
        email,
        password,
        birthDate,
        phoneNumber,
        gender,
        IDNumber,
        address,
      } = req.body;

      if (!name || !email || !password) {
        throw { name: "NotEmpty" };
      }

      const newUser = {
        name,
        email,
        password,
        birthDate,
        phoneNumber,
        gender,
        IDNumber,
        address,
      };

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

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        throw { message: "Invalid ID Token payload" };
      }

      const name = payload.name;
      const email = payload.email;

      let user = await UserModel.findByEmail(email);

      if (!user) {
        // Jika pengguna tidak ditemukan, buat pengguna baru
        const randomPassword = Math.random().toString(36).slice(-8);
        user = await UserModel.insertUserWithDefaultRole({
          name: name,
          email: email,
          password: randomPassword,
        });
      }

      // Generate access token
      const access_token = signToken({ id: user.id, email: user.email });
      res.status(200).json({ access_token });
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

  static async getUserById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await UserModel.findById(id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const id = req.params.id;
      const result = await UserModel.updateById(id, req.body);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const result = await UserModel.deleteById(id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
