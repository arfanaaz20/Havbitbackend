const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/vendorProfileController");

router.get("/", auth, controller.getProfile);
router.post("/", auth, controller.createProfile);
router.put("/", auth, controller.updateProfile);

module.exports = router;
