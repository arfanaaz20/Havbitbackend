




// const Vendor = require("../models/vendorModel");
// const bcrypt = require("bcryptjs");

// const addVendor = async (req, res) => {
//   try {
//     const { name, shop, email, phone, password } = req.body;
//     if (!name || !shop || !email || !phone || !password)
//       return res.status(400).json({ message: "All fields are required" });

//     const existingVendor = await Vendor.findOne({ email });
//     if (existingVendor) return res.status(400).json({ message: "Vendor already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const vendor = new Vendor({ name, shop, email, phone, password: hashedPassword });
//     await vendor.save();

//     res.status(201).json({ message: "Vendor added successfully", vendor });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// module.exports = { addVendor };





const Vendor = require("../models/vendorModel");

exports.updateProfile = async (req, res) => {
    try {
        const vendorId = req.body.vendorId;

        if (!vendorId) {
            return res.status(400).json({ message: "Vendor ID required" });
        }

        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // Text fields
        vendor.shopName = req.body.shopName;
        vendor.address = req.body.address;
        vendor.gmail = req.body.gmail;
        vendor.fssai = req.body.fssai;

        // File uploads
        if (req.files.shopPhoto) vendor.shopPhoto = req.files.shopPhoto[0].path;
        if (req.files.aadhaarPhoto) vendor.aadhaarPhoto = req.files.aadhaarPhoto[0].path;
        if (req.files.panPhoto) vendor.panPhoto = req.files.panPhoto[0].path;
        if (req.files.fssaiPhoto) vendor.fssaiPhoto = req.files.fssaiPhoto[0].path;

        vendor.isKYCCompleted = true;
        await vendor.save();

        res.json({ message: "KYC Updated Successfully", vendor });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error", error: err });
    }
};
