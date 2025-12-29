// const Order = require("../models/order");

// // GET ORDERS FOR VENDOR
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const vendorId = req.params.vendorId;

//     const orders = await Order.find()
//       .populate("user", "name email")
//       .populate("products.product", "name price image vendorId");

//     const vendorOrders = orders
//       .map(order => {
//         const vendorProducts = order.products.filter(
//           p => p.product.vendorId.toString() === vendorId
//         );
//         if (vendorProducts.length > 0) {
//           return { ...order._doc, products: vendorProducts };
//         }
//         return null;
//       })
//       .filter(o => o !== null);

//     res.json(vendorOrders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE ORDER STATUS / TOTAL AMOUNT (Vendor only)
// exports.updateVendorOrder = async (req, res) => {
//   try {
//     const { status, totalAmount } = req.body;
//     const updated = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status, totalAmount },
//       { new: true }
//     )
//       .populate("user", "name email")
//       .populate("products.product", "name price image vendorId");

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE VENDOR PRODUCTS FROM ORDER
// exports.deleteVendorOrder = async (req, res) => {
//   try {
//     const vendorId = req.params.vendorId;
//     const order = await Order.findById(req.params.id).populate(
//       "products.product",
//       "vendorId"
//     );

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     order.products = order.products.filter(
//       p => p.product.vendorId.toString() !== vendorId
//     );

//     await order.save();
//     res.json({ message: "Vendor products removed from order" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




const VendorOrder = require("../models/VendorOrder");

// GET all orders (admin)
exports.getOrders = async (req, res) => {
  try {
    const orders = await VendorOrder.find()
      .populate("user", "name email")
      .populate("products.product", "name price image vendorId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET vendor orders
exports.getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const orders = await VendorOrder.find()
      .populate("user", "name email")
      .populate("products.product", "name price image vendorId");

    const vendorOrders = orders
      .map(order => {
        const vendorProducts = order.products.filter(
          p => p.product.vendorId.toString() === vendorId
        );
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

// CREATE order
exports.createOrder = async (req, res) => {
  try {
    const order = new VendorOrder(req.body);
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE order
exports.updateOrder = async (req, res) => {
  try {
    const { status, totalAmount } = req.body;
    const updated = await VendorOrder.findByIdAndUpdate(
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

// DELETE order
exports.deleteOrder = async (req, res) => {
  try {
    await VendorOrder.findByIdAndDelete(req.params.id);
    res.json({ message: "Order Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
