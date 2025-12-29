// const jwt = require('jsonwebtoken');

// module.exports = function(req, res, next){
//   const token = req.header('Authorization')?.split(' ')[1];
//   if(!token) return res.status(401).json({ message: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MY_SECRET_KEY');
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };





// const jwt = require("jsonwebtoken");
// const Vendor = require("../models/Vendor");

// const vendorAuth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
//     const vendor = await Vendor.findById(decoded.id);
//     if (!vendor) return res.status(401).json({ message: "Vendor not found" });

//     req.vendor = vendor;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = vendorAuth;





const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");

const vendorAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 IMPORTANT: attach user to req
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = vendorAuth;
