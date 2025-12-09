






// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Vendor = require("../models/vendorModel");
// const { addVendor, vendorLogin } = require("../controllers/vendorAuthController");
// const authMiddleware = require("../middleware/vendorAuth"); // JWT check

// const upload = multer({ dest: "uploads/" });

// // Vendor signup
// router.post("/add-vendor", addVendor);

// // Vendor login
// router.post("/login", vendorLogin);

// // Vendor KYC update
// router.post(
//   "/update-profile",
//   authMiddleware,
//   upload.fields([
//     { name: "shopPhoto", maxCount: 1 },
//     { name: "aadhaarPhoto", maxCount: 1 },
//     { name: "panPhoto", maxCount: 1 },
//     { name: "fssaiPhoto", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       const vendor = await Vendor.findById(req.vendor.id);
//       if (!vendor) return res.status(404).json({ message: "Vendor not found" });

//       vendor.shopName = req.body.shopName;
//       vendor.address = req.body.address;
//       vendor.email = req.body.email;
//       vendor.phone = req.body.phone;
//       vendor.gmail = req.body.gmail;
//       vendor.fssai = req.body.fssai;

//       if (req.files.shopPhoto) vendor.shopPhoto = req.files.shopPhoto[0].path;
//       if (req.files.aadhaarPhoto) vendor.aadhaarPhoto = req.files.aadhaarPhoto[0].path;
//       if (req.files.panPhoto) vendor.panPhoto = req.files.panPhoto[0].path;
//       if (req.files.fssaiPhoto) vendor.fssaiPhoto = req.files.fssaiPhoto[0].path;

//       vendor.isKYCCompleted = true;
//       await vendor.save();

//       res.status(200).json({ message: "KYC submitted successfully!", vendor });
//     } catch (err) {
//       res.status(500).json({ message: "Server error", error: err.message });
//     }
//   }
// );

// module.exports = router;









// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Vendor = require("../models/vendorModel");
// const { addVendor, vendorLogin } = require("../controllers/vendorAuthController");

// // File upload config
// const upload = multer({ dest: "uploads/" });

// // Vendor signup
// router.post("/add-vendor", addVendor);

// // Vendor login
// router.post("/login", vendorLogin);

// // Vendor KYC update
// router.post("/update-profile", upload.fields([
//   { name: "shopPhoto", maxCount: 1 },
//   { name: "aadhaarPhoto", maxCount: 1 },
//   { name: "panPhoto", maxCount: 1 },
//   { name: "fssaiPhoto", maxCount: 1 }
// ]), async (req, res) => {
//   try {
//     const { vendorId } = req.body; // Send vendorId from frontend for now
//     const vendor = await Vendor.findById(vendorId);
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

//     vendor.shopName = req.body.shopName;
//     vendor.address = req.body.address;
//     vendor.email = req.body.email;
//     vendor.phone = req.body.phone;
//     vendor.gmail = req.body.gmail;
//     vendor.fssai = req.body.fssai;

//     if (req.files.shopPhoto) vendor.shopPhoto = req.files.shopPhoto[0].path;
//     if (req.files.aadhaarPhoto) vendor.aadhaarPhoto = req.files.aadhaarPhoto[0].path;
//     if (req.files.panPhoto) vendor.panPhoto = req.files.panPhoto[0].path;
//     if (req.files.fssaiPhoto) vendor.fssaiPhoto = req.files.fssaiPhoto[0].path;

//     vendor.isKYCCompleted = true;
//     await vendor.save();

//     res.status(200).json({ message: "KYC submitted successfully", vendor });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// module.exports = router;







const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { updateProfile } = require("../controllers/vendorController");

// Multer upload folder
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/");
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
});

// KYC UPLOAD API
router.post(
    "/update-profile",
    upload.fields([
        { name: "shopPhoto", maxCount: 1 },
        { name: "aadhaarPhoto", maxCount: 1 },
        { name: "panPhoto", maxCount: 1 },
        { name: "fssaiPhoto", maxCount: 1 }
    ]),
    updateProfile
);

module.exports = router;
