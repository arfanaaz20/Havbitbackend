



const express = require("express");
const router = express.Router();
const {
  getOrders,
  getVendorOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

// ADMIN ORDERS
router.get("/", getOrders);

// VENDOR ORDERS
router.get("/vendor/:vendorId", getVendorOrders);

// UPDATE ORDER
router.put("/:id", updateOrder);

// DELETE ORDER
router.delete("/:id", deleteOrder);

module.exports = router;
