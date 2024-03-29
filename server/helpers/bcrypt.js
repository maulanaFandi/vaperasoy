const bcrypt = require("bcryptjs");

const generate = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const validate = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

module.exports = { generate, validate };