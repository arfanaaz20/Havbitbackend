const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

/* =====================================================
   ✅ CORS – FINAL WORKING (VERCEL + LOCAL)
   ===================================================== */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://havbitadminfrontend.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // 🔥 PRE-FLIGHT REQUEST FIX (MAIN ISSUE)
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/* =====================================================
   BODY PARSER
   ===================================================== */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/* =====================================================
   STATIC FILES
   ===================================================== */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =====================================================
   ROUTES
   ===================================================== */
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/subcategories", require("./routes/subCategoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

/* Vendor */
app.use("/api/vendor", require("./routes/vendorAuth"));
app.use("/api/vendor/categories", require("./routes/vendorCategoryRoutes"));
app.use("/api/vendor/products", require("./routes/vendorProductRoutes"));
app.use(
  "/api/vendor/subcategories",
  require("./routes/vendorSubCategoryRoutes")
);
app.use("/api/vendorOrders", require("./routes/vendorOrderRoutes"));
app.use(
  "/api/vendors/profile",
  require("./routes/vendorProfileRoutes")
);

/* Admin */
app.use("/api/admin", require("./routes/adminVendor"));

/* =====================================================
   TEST ROUTES
   ===================================================== */
app.get("/", (req, res) => {
  res.send("🚀 Havbit Backend Running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    time: new Date().toISOString(),
  });
});

app.get("/api", (req, res) => {
  res.json({
    name: "Havbit E-commerce API",
    version: "1.0.0",
  });
});

/* =====================================================
   404 HANDLER
   ===================================================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* =====================================================
   GLOBAL ERROR HANDLER
   ===================================================== */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* =====================================================
   DB + SERVER (VERCEL SAFE)
   ===================================================== */
const PORT = process.env.PORT || 7002;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });

module.exports = app;
