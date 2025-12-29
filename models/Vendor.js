// const mongoose = require("mongoose");

// const vendorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   shop: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },

//   // KYC
//   shopName: String,
//   address: String,
//   fssai: String,
//   gstin: String,

//   shopPhoto: String,
//   aadhaarPhoto: String,
//   panPhoto: String,
//   gstCertificate: String,

//   isKYCCompleted: { type: Boolean, default: false },
//   isApproved: { type: Boolean, default: false }
// }, { timestamps: true });

// module.exports = mongoose.model("Vendor", vendorSchema);







// import React, { useEffect, useState } from "react";
// import API from "../../services/api";

// export default function VendorProfile() {
//   const [profile, setProfile] = useState({ name: "", email: "" });
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   useEffect(() => {
//     API.get("/vendors/profile")
//       .then((res) => {
//         setProfile(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     API.put("/vendors/profile", profile)
//       .then((res) => {
//         alert("Profile updated successfully!");
//         setProfile(res.data);
//         setUpdating(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Failed to update profile");
//         setUpdating(false);
//       });
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Vendor Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={profile.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit" disabled={updating}>
//           {updating ? "Updating..." : "Update Profile"}
//         </button>
//       </form>
//     </div>
//   );
// }



// const mongoose = require("mongoose");

// const vendorSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//     // 🔹 Optional profile fields
//     name: { type: String, trim: true },
//     phone: { type: String },
//     company: { type: String },
//     address: { type: String },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Vendor", vendorSchema);





const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // 🔹 Optional profile fields
    name: { type: String, trim: true },
    phone: { type: String },
    company: { type: String },
    address: { type: String },

    // 🔹 Approval status
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
