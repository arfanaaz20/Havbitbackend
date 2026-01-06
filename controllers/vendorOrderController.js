

const VendorOrder = require("../models/VendorOrder");

/* =========================
   CREATE ORDER (WEBSITE / ADMIN)
========================= */
exports.createOrder = async (req, res) => {
  try {
    const { vendor, user, products, totalAmount, status } = req.body;

    if (!vendor || !user || !products || products.length === 0) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const order = await VendorOrder.create({
      vendor,
      user,
      products,
      totalAmount,
      status,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET ALL ORDERS (VENDOR PANEL)
========================= */
exports.getVendorOrders = async (req, res) => {
  try {
    const orders = await VendorOrder.find({
      vendor: req.vendor._id,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET ORDER BY ID
========================= */
exports.getOrderById = async (req, res) => {
  try {
    const order = await VendorOrder.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    }).populate("user", "name");

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE ORDER
========================= */
exports.updateOrder = async (req, res) => {
  try {
    const order = await VendorOrder.findOneAndUpdate(
      { _id: req.params.id, vendor: req.vendor._id },
      req.body,
      { new: true }
    );

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   DELETE ORDER
========================= */
exports.deleteOrder = async (req, res) => {
  try {
    const order = await VendorOrder.findOneAndDelete({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
