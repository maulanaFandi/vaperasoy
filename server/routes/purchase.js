const express = require("express");
const router = express.Router();
const PurchaseController = require("../controllers/purchase");

router.get("/purchase", PurchaseController.getAllPurchases);

router.post("/purchase", PurchaseController.createPurchase);

module.exports = router;