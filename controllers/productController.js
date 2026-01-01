


// controllers/productController.js
const Product = require("../models/Product");
const csv = require("csv-parser");
const fs = require("fs");

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// EXPORT CSV
exports.exportProductsCSV = async (req, res) => {
  try {
    const products = await Product.find();
    const fields = Object.keys(products[0]._doc);
    const { Parser } = require("json2csv");
    const parser = new Parser({ fields });
    const csvData = parser.parse(products);

    res.header("Content-Type", "text/csv");
    res.attachment("products.csv");
    res.send(csvData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// IMPORT CSV
exports.importCSV = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "CSV file required" });

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        await Product.insertMany(results);
        res.status(200).json({ message: "CSV imported successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
};
 
