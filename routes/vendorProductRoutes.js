


const express = require("express");
const router = express.Router();
const multer = require("multer");
const vendorAuth = require("../middleware/vendorAuth");
const controller = require("../controllers/vendorProductController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.use(vendorAuth);

router.get("/", controller.getVendorProducts);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  controller.createVendorProduct
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  controller.updateVendorProduct
);

router.delete("/:id", controller.deleteVendorProduct);

module.exports = router;
