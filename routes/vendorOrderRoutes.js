// const express = require("express");
// const router = express.Router();
// const {
//   getVendorOrders,
//   updateVendorOrder,
//   deleteVendorOrder,
// } = require("../controllers/vendorOrderController");

// // VENDOR ORDERS
// router.get("/vendor/:vendorId", getVendorOrders);

// // UPDATE ORDER
// router.put("/:id", updateVendorOrder);

// // DELETE ORDER (Vendor products only)
// router.delete("/:id/:vendorId", deleteVendorOrder);

// module.exports = router;






const express = require("express");
const router = express.Router();
const {
  getOrders,
  getVendorOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/vendorOrderController");

// ADMIN orders
router.get("/", getOrders);

// VENDOR orders
router.get("/vendor/:vendorId", getVendorOrders);

// CREATE order
router.post("/", createOrder);

// UPDATE order
router.put("/:id", updateOrder);

// DELETE order
router.delete("/:id", deleteOrder);

module.exports = router;
