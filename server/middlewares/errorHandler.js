const errHandle = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "EmailNotEmpty":
      res.status(400).json({ message: "Email or Password Is Required" });
      break;
    case "PasswordNotEmpty":
      res.status(400).json({ message: "Password Is Required" });
      break;
    case "NameNotEmpty":
      res.status(400).json({ message: "Name Is Required" });
      break;
    case "BirthDateNotEmpty":
      res.status(400).json({ message: "Date Is Required" });
      break;
    case "PhoneNotEmpty":
      res.status(400).json({ message: "Phone Is Required" });
      break;
    case "GenderNotEmpty":
      res.status(400).json({ message: "Gender Is Required" });
      break;
    case "IDNotEmpty":
      res.status(400).json({ message: "NIK Is Required" });
      break;
    case "SalaryNotEmpty":
      res.status(400).json({ message: "Salary Is Required" });
      break;
    case "AddressNotEmpty":
      res.status(400).json({ message: "Address Is Required" });
      break;
    case "InvalidLogin":
      res.status(401).json({ message: "Wrong Email/Password" });
      break;
    case "NotFound":
      res.status(404).json({ message: "Data Not Found" });
      break;
    case "AlreadyExist":
      res.status(409).json({ message: "Account Already Exist" });
    case "Unauthorized":
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid Token" });
      break;
    case "Forbiden":
      res.status(403).json({ message: " Restricted Admin Only" });
      break;

    default:
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};
module.exports = errHandle;
