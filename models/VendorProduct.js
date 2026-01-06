



const mongoose = require("mongoose");

const vendorProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    restaurantName: String,

    oldPrice: Number,
    newPrice: Number,
    stock: Number,

    cuisine: String,
    size: String,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorCategory",
      required: true,
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorSubCategory",
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorProduct", vendorProductSchema);
