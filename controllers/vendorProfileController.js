const Vendor = require("../models/Vendor");

// GET
exports.getProfile = async (req, res) => {
  const profile = await Vendor.findOne({ userId: req.user.id });
  if (!profile) return res.status(404).json(null);
  res.json(profile);
};

// CREATE
exports.createProfile = async (req, res) => {
  const exists = await Vendor.findOne({ userId: req.user.id });
  if (exists) return res.status(400).json({ message: "Profile exists" });

  const profile = await Vendor.create({
    userId: req.user.id,
    ...req.body,
  });

  res.json(profile);
};

// UPDATE
exports.updateProfile = async (req, res) => {
  const profile = await Vendor.findOneAndUpdate(
    { userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(profile);
};
