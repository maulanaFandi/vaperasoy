const { validate } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const UserModel = require("../models/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password, birthDate, phoneNumber, gender, address } =
        req.body;

      if (!name) {
        throw { name: "NameNotEmpty" };
      }

      if (!email) {
        throw { name: "EmailNotEmpty" };
      }

      const user = await UserModel.findByEmail(email);

      if (user) {
        throw { name: "AlreadyExist" };
      }

      if (!password) {
        throw { name: "PasswordNotEmpty" };
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

      if (!address) {
        throw { name: "AddressNotEmpty" };
      }

      const newUser = {
        name,
        email,
        password,
        birthDate,
        phoneNumber,
        gender,
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

      if (!email) {
        throw { name: "EmailNotEmpty" };
      }

      if (!password) {
        throw { name: "PasswordNotEmpty" };
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

  static async getProfile(req, res, next) {
    try {
      const userEmail = req.user.email;

      const userProfile = await UserModel.findByEmail(userEmail);

      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }

      res.status(200).json(userProfile);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const userEmail = req.user.email;

      const userProfile = await UserModel.findByEmail(userEmail);

      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }

      const { birthDate, phoneNumber, gender, IDNumber, address } = req.body;

      // Buat objek baru yang berisi data yang diperbarui
      const updatedUserData = {
        birthDate,
        phoneNumber,
        gender,
        IDNumber,
        address,
      };

      // Panggil metode updateProfile dari UserModel dengan id pengguna dan data yang diperbarui
      const updatedUser = await UserModel.updateById(
        userProfile._id,
        updatedUserData
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
