

const express = require("express");
const router = express.Router();

const vendorAuth = require("../middleware/vendorAuth");
const controller = require("../controllers/vendorProfileController");

// 🔥 PUT API
router.put("/password", vendorAuth, controller.updatePassword);

module.exports = router;
