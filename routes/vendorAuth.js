



const express = require("express");
const router = express.Router();
const { addVendor, vendorLogin } = require("../controllers/vendorAuthController");

// ADD VENDOR
router.post("/add-vendor", addVendor);

// LOGIN VENDOR
router.post("/login", vendorLogin);

module.exports = router;
