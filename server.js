const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

/* =====================================================
   CORS (VERCEL + FRONTEND)
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

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // ✅ SERVERLESS SAFE
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
app.use("/api/vendor/subcategories", require("./routes/vendorSubCategoryRoutes"));
app.use("/api/vendorOrders", require("./routes/vendorOrderRoutes"));
app.use("/api/vendors/profile", require("./routes/vendorProfileRoutes"));

/* Admin */
app.use("/api/admin", require("./routes/adminVendor"));

/* =====================================================
   TEST ROUTES
   ===================================================== */
app.get("/", (req, res) => {
  res.send("🚀 Havbit Backend Running (Vercel)");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    time: new Date().toISOString(),
  });
});

/* =====================================================
   ERROR HANDLER
   ===================================================== */
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* =====================================================
   🔥 MONGODB CONNECTION (SERVERLESS SAFE)
   ===================================================== */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB Connected");
}

/* =====================================================
   🔥 SERVERLESS HANDLER EXPORT (MAIN FIX)
   ===================================================== */
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
