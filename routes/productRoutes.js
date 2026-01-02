

const express = require("express");
const router = express.Router();

const csvUpload = require("../middleware/csvUpload");
const cloudUpload = require("../middleware/cloudUpload");

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  exportProductsCSV,
  importCSV
} = require("../controllers/productController");

// Export CSV
router.get("/export/csv", exportProductsCSV);

// Import CSV
router.post("/import", csvUpload.single("file"), importCSV);

// Get all
router.get("/", getProducts);

// Get by ID
router.get("/:id", getProductById);

// Add product
router.post(
  "/",
  cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
  addProduct
);

// Update product
router.put(
  "/:id",
  cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
  updateProduct
);

// Delete
router.delete("/:id", deleteProduct);

module.exports = router;
