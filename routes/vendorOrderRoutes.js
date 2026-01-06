


const express = require("express");
const router = express.Router();
const vendorAuth = require("../middleware/vendorAuth");
const {
  createOrder,
  getVendorOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/vendorOrderController");

/* WEBSITE / ADMIN */
router.post("/", createOrder); // 🔓 website se order add

/* VENDOR PANEL */
router.get("/my", vendorAuth, getVendorOrders);
router.get("/:id", vendorAuth, getOrderById);
router.put("/:id", vendorAuth, updateOrder);
router.delete("/:id", vendorAuth, deleteOrder);

module.exports = router;
