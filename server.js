


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config();

// const app = express();

// // Enable CORS for frontend
// app.use(cors({
//   origin: ["http://localhost:3000","http://localhost:5173","http://localhost:5174","http://localhost:5175"], // React frontend
//   methods: ["GET","POST","PUT","DELETE","OPTIONS"],
//   allowedHeaders: ["Content-Type","Authorization"],
//   credentials: true
// }));

// // Handle preflight requests
// app.options("*", cors());

// // Parse JSON
// app.use(express.json());

// // Serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Import routes

// const orderRoutes = require("./routes/orderRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const productRoutes = require("./routes/productRoutes");
// const authRoutes = require("./routes/auth");
// const categoryRoutes = require("./routes/categoryRoutes");
// const subCategoryRoutes = require("./routes/subCategoryRoutes");
// const customerRoutes = require("./routes/customerRoutes");
// const vendorAuthRoutes = require("./routes/vendorAuth");
// const adminVendorRoutes = require("./routes/adminVendor");

// // Use routes
// // app.use("/api/vendor", vendorRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);       // login & register
// app.use("/api/categories", categoryRoutes);
// app.use("/api/subcategories", subCategoryRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/customer", customerRoutes);
// app.use("/api/vendor", vendorAuthRoutes);
// app.use("/api/admin", adminVendorRoutes);
// app.use("/api/vendor/categories", require("./routes/vendorCategoryRoutes"));
// app.use("/api/vendor/products", require("./routes/vendorProductRoutes"));
// app.use("/api/vendor/subcategories", require("./routes/vendorSubCategoryRoutes"));

// // Connect to MongoDB & start server
// const PORT = process.env.PORT || 7002;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on port ${PORT}`)
//     );
//   })
//   .catch((err) => console.log("❌ MongoDB Error:", err.message));










// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config();

// const app = express();

// // Enable CORS for frontend
// app.use(cors({
//   origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// // Handle preflight requests
// app.options("*", cors());

// // Custom JSON parser with error handling
// const rawBodySaver = function (req, res, buf, encoding) {
//   if (buf && buf.length) {
//     req.rawBody = buf.toString(encoding || 'utf8');
//   }
// };

// // Parse JSON with better error handling
// app.use(express.json({
//   verify: rawBodySaver,
//   limit: "50mb"
// }));

// app.use(express.urlencoded({
//   extended: true,
//   verify: rawBodySaver,
//   limit: "50mb"
// }));

// // JSON parse error handler
// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//     console.error('❌ JSON Parse Error:', err.message);
//     console.error('📝 Raw request body:', req.rawBody ? req.rawBody.substring(0, 200) : 'No body');
    
//     return res.status(400).json({
//       success: false,
//       message: "Invalid JSON format",
//       error: "Please check your request body. Ensure it's valid JSON.",
//       hint: "Common issues: missing commas, extra quotes, or trailing commas"
//     });
//   }
//   next();
// });

// // Serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Log all incoming requests
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
//   if (req.body && Object.keys(req.body).length > 0) {
//     console.log('📦 Request Body:', JSON.stringify(req.body).substring(0, 200));
//   }
//   next();
// });

// // Import routes
// const orderRoutes = require("./routes/orderRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const productRoutes = require("./routes/productRoutes");
// const authRoutes = require("./routes/auth");
// const categoryRoutes = require("./routes/categoryRoutes");
// const subCategoryRoutes = require("./routes/subCategoryRoutes");
// const customerRoutes = require("./routes/customerRoutes");
// const vendorAuthRoutes = require("./routes/vendorAuth");
// const adminVendorRoutes = require("./routes/adminVendor");

// // Use routes
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/subcategories", subCategoryRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/customer", customerRoutes);
// app.use("/api/vendor", vendorAuthRoutes);
// app.use("/api/admin", adminVendorRoutes);
// app.use("/api/vendor/categories", require("./routes/vendorCategoryRoutes"));
// app.use("/api/vendor/products", require("./routes/vendorProductRoutes"));
// app.use("/api/vendor/subcategories", require("./routes/vendorSubCategoryRoutes"));

// // Test endpoint
// app.get("/test", (req, res) => {
//   res.json({
//     success: true,
//     message: "Server is running correctly",
//     timestamp: new Date().toISOString()
//   });
// });

// // Simple test POST endpoint
// app.post("/test-json", (req, res) => {
//   console.log("✅ Valid JSON received:", req.body);
//   res.json({
//     success: true,
//     message: "JSON is valid",
//     received: req.body
//   });
// });

// // Connect to MongoDB & start server
// const PORT = process.env.PORT || 7002;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//       console.log(`📍 Test endpoint: http://localhost:${PORT}/test`);
//       console.log(`📍 Test JSON endpoint: http://localhost:${PORT}/test-json`);
//       console.log("\n📡 Available APIs:");
//       console.log("   Customer API:   http://localhost:7002/api/customer/*");
//       console.log("   Auth API:       http://localhost:7002/api/auth/*");
//       console.log("   Products API:   http://localhost:7002/api/products/*");
//     });
//   })
//   .catch((err) => {
//     console.log("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   });

















// // // server.js
// // const express = require("express");
// // const cors = require("cors");
// // require("dotenv").config();

// // const app = express();

// // // Enable CORS
// // app.use(cors({
// //   origin: "*",
// //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //   allowedHeaders: ["Content-Type", "Authorization"]
// // }));

// // // Parse JSON
// // app.use(express.json());

// // // Add request logging
// // app.use((req, res, next) => {
// //   console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
// //   next();
// // });

// // // Import routes
// // const customerRoutes = require("./routes/customerRoutes");

// // // Use routes
// // app.use("/api/customer", customerRoutes);

// // // Test endpoints
// // app.get("/", (req, res) => {
// //   res.json({
// //     message: "Server is running!",
// //     timestamp: new Date().toISOString(),
// //     endpoints: {
// //       root: "GET /",
// //       test: "GET /test",
// //       customer: "GET /api/customer",
// //       register: "POST /api/customer/register",
// //       login: "POST /api/customer/login"
// //     }
// //   });
// // });

// // app.get("/test", (req, res) => {
// //   res.json({ 
// //     success: true, 
// //     message: "Test endpoint works!" 
// //   });
// // });

// // app.post("/test-json", (req, res) => {
// //   console.log("Received JSON:", req.body);
// //   res.json({
// //     success: true,
// //     message: "JSON received successfully",
// //     data: req.body
// //   });
// // });

// // // 404 handler
// // app.use((req, res) => {
// //   res.status(404).json({
// //     success: false,
// //     message: `Route not found: ${req.method} ${req.path}`
// //   });
// // });

// // // Error handler
// // app.use((err, req, res, next) => {
// //   console.error("Server error:", err);
// //   res.status(500).json({
// //     success: false,
// //     message: "Internal server error"
// //   });
// // });

// // // Start server
// // const PORT = process.env.PORT || 7002;

// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// //   console.log("\n📡 Test these endpoints:");
// //   console.log(`   1. GET  http://localhost:${PORT}/`);
// //   console.log(`   2. GET  http://localhost:${PORT}/test`);
// //   console.log(`   3. GET  http://localhost:${PORT}/api/customer`);
// //   console.log(`   4. POST http://localhost:${PORT}/api/customer/register`);
// //   console.log(`   5. POST http://localhost:${PORT}/api/customer/login`);
// //   console.log(`\n💡 Use Ctrl+C to stop the server`);
// // });






























// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config();

// const app = express();

// // Enable CORS for frontend
// app.use(cors({
//   origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// // Handle preflight requests
// app.options("*", cors());

// // Custom JSON parser with error handling
// const rawBodySaver = function (req, res, buf, encoding) {
//   if (buf && buf.length) {
//     req.rawBody = buf.toString(encoding || 'utf8');
//   }
// };

// // Parse JSON with better error handling
// app.use(express.json({
//   verify: rawBodySaver,
//   limit: "50mb"
// }));

// app.use(express.urlencoded({
//   extended: true,
//   verify: rawBodySaver,
//   limit: "50mb"
// }));

// // JSON parse error handler
// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//     console.error('❌ JSON Parse Error:', err.message);
//     console.error('📝 Raw request body:', req.rawBody ? req.rawBody.substring(0, 200) : 'No body');
    
//     return res.status(400).json({
//       success: false,
//       message: "Invalid JSON format",
//       error: "Please check your request body. Ensure it's valid JSON.",
//       hint: "Common issues: missing commas, extra quotes, or trailing commas"
//     });
//   }
//   next();
// });

// // Serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Log all incoming requests
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
//   if (req.body && Object.keys(req.body).length > 0) {
//     console.log('📦 Request Body:', JSON.stringify(req.body).substring(0, 200));
//   }
//   next();
// });

// // ==================== IMPORT ALL ROUTES ====================

// const orderRoutes = require("./routes/orderRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const productRoutes = require("./routes/productRoutes");
// const authRoutes = require("./routes/auth");
// const categoryRoutes = require("./routes/categoryRoutes");
// const subCategoryRoutes = require("./routes/subCategoryRoutes");
// const customerRoutes = require("./routes/customerRoutes");
// const vendorAuthRoutes = require("./routes/vendorAuth");
// const adminVendorRoutes = require("./routes/adminVendor");

// // ==================== USE ALL ROUTES ====================

// // Customer API
// app.use("/api/customer", customerRoutes);

// // Admin Auth API
// app.use("/api/auth", authRoutes);

// // Products API
// app.use("/api/products", productRoutes);

// // Categories API
// app.use("/api/categories", categoryRoutes);

// // Subcategories API
// app.use("/api/subcategories", subCategoryRoutes);

// // Orders API
// app.use("/api/orders", orderRoutes);

// // Payment API
// app.use("/api/payment", paymentRoutes);

// // Vendor Auth API
// app.use("/api/vendor", vendorAuthRoutes);

// // Admin Vendor Management API
// app.use("/api/admin", adminVendorRoutes);

// // Vendor Categories API
// app.use("/api/vendor/categories", require("./routes/vendorCategoryRoutes"));

// // Vendor Products API
// app.use("/api/vendor/products", require("./routes/vendorProductRoutes"));

// // Vendor Subcategories API
// app.use("/api/vendor/subcategories", require("./routes/vendorSubCategoryRoutes"));

// // ==================== TEST ENDPOINTS ====================

// // Test endpoint
// app.get("/test", (req, res) => {
//   res.json({
//     success: true,
//     message: "Server is running correctly",
//     timestamp: new Date().toISOString()
//   });
// });

// // Simple test POST endpoint
// app.post("/test-json", (req, res) => {
//   console.log("✅ Valid JSON received:", req.body);
//   res.json({
//     success: true,
//     message: "JSON is valid",
//     received: req.body
//   });
// });

// // API Info endpoint
// app.get("/api", (req, res) => {
//   res.json({
//     success: true,
//     message: "Havbit E-commerce API",
//     version: "1.0.0",
//     endpoints: {
//       customer: {
//         register: "POST /api/customer/register",
//         login: "POST /api/customer/login",
//         profile: "GET /api/customer/profile",
//         addresses: "GET /api/customer/addresses"
//       },
//       auth: {
//         admin_register: "POST /api/auth/register",
//         admin_login: "POST /api/auth/login",
//         admin_profile: "GET /api/auth/me"
//       },
//       categories: {
//         get_all: "GET /api/categories",
//         get_one: "GET /api/categories/:id"
//       },
//       products: {
//         get_all: "GET /api/products",
//         get_one: "GET /api/products/:id"
//       }
//     }
//   });
// });

// // Health check
// app.get("/health", (req, res) => {
//   res.json({
//     status: "OK",
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//     database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
//   });
// });

// // ==================== ERROR HANDLING ====================

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//     available_routes: [
//       "/api/customer/*",
//       "/api/auth/*",
//       "/api/categories/*",
//       "/api/products/*",
//       "/api/orders/*",
//       "/api/payment/*"
//     ]
//   });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error("🚨 Server Error:", err.stack);
  
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
  
//   res.status(statusCode).json({
//     success: false,
//     message: message,
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack })
//   });
// });

// // ==================== DATABASE & SERVER START ====================

// // Connect to MongoDB & start server
// const PORT = process.env.PORT || 7002;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//       console.log("\n📡 Available APIs:");
//       console.log("   1. Customer API:     http://localhost:7002/api/customer");
//       console.log("   2. Admin Auth API:   http://localhost:7002/api/auth");
//       console.log("   3. Categories API:   http://localhost:7002/api/categories");
//       console.log("   4. Products API:     http://localhost:7002/api/products");
//       console.log("   5. Orders API:       http://localhost:7002/api/orders");
//       console.log("   6. Payment API:      http://localhost:7002/api/payment");
//       console.log("\n🔧 Test endpoints:");
//       console.log("   • GET  http://localhost:7002/test");
//       console.log("   • GET  http://localhost:7002/health");
//       console.log("   • GET  http://localhost:7002/api");
//       console.log("   • POST http://localhost:7002/test-json");
//     });
//   })
//   .catch((err) => {
//     console.log("❌ MongoDB Error:", err.message);
//     console.log("⚠️ Starting server without database connection...");
    
//     // Start server even if MongoDB fails (for testing)
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT} (without MongoDB)`);
//     });
//   });











// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const vendorOrderRoutes = require("./routes/vendorOrderRoutes");
// const vendorProfileRoutes = require("./routes/vendorProfileRoutes"); 
// // const vendorProfileRoutes = require("./routes/vendorProfileRoutes");

// dotenv.config();

// const app = express();

// /* ======================= CORS ======================= */
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "http://localhost:5175",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// app.options("*", cors());

// /* ======================= BODY PARSER ======================= */
// const rawBodySaver = (req, res, buf, encoding) => {
//   if (buf && buf.length) {
//     req.rawBody = buf.toString(encoding || "utf8");
//   }
// };

// app.use(
//   express.json({
//     limit: "50mb",
//     verify: rawBodySaver,
//   })
// );

// app.use(
//   express.urlencoded({
//     extended: true,
//     limit: "50mb",
//     verify: rawBodySaver,
//   })
// );

// /* ======================= JSON ERROR HANDLER ======================= */
// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
//     console.error("❌ JSON Parse Error:", err.message);
//     return res.status(400).json({
//       success: false,
//       message: "Invalid JSON format",
//     });
//   }
//   next();
// });

// /* ======================= STATIC ======================= */
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// /* ======================= REQUEST LOG ======================= */
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//   next();
// });

// /* ======================= ROUTES ======================= */
// app.use("/api/customer", require("./routes/customerRoutes"));
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/categories", require("./routes/categoryRoutes"));
// app.use("/api/subcategories", require("./routes/subCategoryRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));
// app.use("/api/payment", require("./routes/paymentRoutes"));
// app.use("/api/vendor", require("./routes/vendorAuth"));
// app.use("/api/admin", require("./routes/adminVendor"));
// app.use("/api/vendor/categories", require("./routes/vendorCategoryRoutes"));
// app.use("/api/vendor/products", require("./routes/vendorProductRoutes"));
// app.use("/api/vendor/subcategories", require("./routes/vendorSubCategoryRoutes"));
// app.use("/api/vendorOrders", vendorOrderRoutes);
// app.use("/api/vendors/profile", vendorProfileRoutes);
// // app.use("/api/vendors/profile", vendorProfileRoutes);

// /* ======================= TEST ROUTES ======================= */
// app.get("/", (req, res) => {
//   res.send("🚀 Havbit Backend Running");
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "OK",
//     uptime: process.uptime(),
//     database:
//       mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
//     time: new Date().toISOString(),
//   });
// });

// app.get("/api", (req, res) => {
//   res.json({
//     name: "Havbit E-commerce API",
//     version: "1.0.0",
//   });
// });

// /* ======================= 404 HANDLER ======================= */
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//   });
// });

// /* ======================= GLOBAL ERROR ======================= */
// app.use((err, req, res, next) => {
//   console.error("🔥 Server Error:", err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Internal Server Error",
//   });
// });

// /* ======================= DB + SERVER ======================= */
// const PORT = process.env.PORT || 7002;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on port ${PORT}`)
//     );
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   });





const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const vendorOrderRoutes = require("./routes/vendorOrderRoutes");
const vendorProfileRoutes = require("./routes/vendorProfileRoutes");

dotenv.config();

const app = express();

/* ======================= CORS ======================= */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
        "https://havbitadminfrontend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

/* ======================= BODY PARSER ======================= */
const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

app.use(
  express.json({
    limit: "50mb",
    verify: rawBodySaver,
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
    verify: rawBodySaver,
  })
);

/* ======================= JSON ERROR HANDLER ======================= */
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format",
    });
  }
  next();
});

/* ======================= STATIC ======================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ======================= REQUEST LOG ======================= */
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );
  next();
});

/* ======================= ROUTES ======================= */
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
app.use("/api/vendorOrders", vendorOrderRoutes);
app.use("/api/vendors/profile", vendorProfileRoutes);

/* Admin */
app.use("/api/admin", require("./routes/adminVendor"));

/* ======================= TEST ROUTES ======================= */
app.get("/", (req, res) => {
  res.send("🚀 Havbit Backend Running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    time: new Date().toISOString(),
  });
});

app.get("/api", (req, res) => {
  res.json({
    name: "Havbit E-commerce API",
    version: "1.0.0",
  });
});

/* ======================= 404 ======================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* ======================= GLOBAL ERROR ======================= */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ======================= DB + SERVER ======================= */
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
    process.exit(1);
  });
