const bcrypt = require("bcryptjs");

const generate = (password) => {
  return bcrypt.hashSync(password, 10);
};

const validate = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

module.exports = { generate, validate };