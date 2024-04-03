const express = require("express");
const router = express.Router();
const StaffController = require("../controllers/staff");

router.post("/staff", StaffController.createStaff);

router.get("/staff", StaffController.getAllStaff);

router.get("/staff/:id", StaffController.getStaffById);

router.patch("/staff/:id", StaffController.updateStaff);

router.delete("/staff/:id", StaffController.deleteStaff);

module.exports = router;
