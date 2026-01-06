




const Order = require("../models/order");

// GET ALL ORDERS (ADMIN)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price image vendorId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET VENDOR ORDERS
exports.getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price image vendorId");

    // Filter products to vendor only
    const vendorOrders = orders
      .map(order => {
        const vendorProducts = order.products.filter(p => p.product.vendorId.toString() === vendorId);
        if (vendorProducts.length > 0) {
          return { ...order._doc, products: vendorProducts };
        }
        return null;
      })
      .filter(o => o !== null);

    res.json(vendorOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ORDER
exports.updateOrder = async (req, res) => {
  try {
    const { status, totalAmount } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status, totalAmount },
      { new: true }
    )
      .populate("user", "name email")
      .populate("products.product", "name price image vendorId");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
