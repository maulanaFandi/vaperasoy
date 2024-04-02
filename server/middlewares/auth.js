const { verifyToken } = require("../helpers/jwt");
const { db } = require("../config/database"); // Import MongoDB database connection

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      throw {
        name: "Unauthorized",
      };

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer")
      throw {
        name: "Unauthorized",
      };

    const payload = verifyToken(token);
    
    const user = await db.collection('Users').findOne({ email: payload.email });
    
    if (!user)
      throw {
        name: "Unauthorized",
      };
      
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;