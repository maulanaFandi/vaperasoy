const express = require("express");
const router = express.Router();
const StaffController = require("../controllers/staff");

router.post("/add-staff", StaffController.createStaff);

router.get("/staff", StaffController.getAllStaff);

module.exports = router;
