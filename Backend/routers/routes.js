const express = require("express");
const router = express.Router();
const userSchema = require("../models/userSchema");
const category = require("../models/categorySchema");
const productDatabase = require("../models/productSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const middlewareprotect = require("../middleware/middleware");

// Load environment variables
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "alos-interiors-products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }]
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// =====================
// USER ROUTES
// =====================

// SIGN UP
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await userSchema.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    if (!newUser) return res.status(400).json({ message: "Invalid input" });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });

    if (!user) return res.status(400).json({ message: "Email not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Protected example route
router.get("/cart", middlewareprotect, (req, res) => {
  res.json({ message: "This route is protected and working" });
});

// =====================
// CATEGORY ROUTES
// =====================

// ADD CATEGORY
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Missing category name" });

    const imageUrl = req.file ? req.file.path : null;
    const newCategory = await category.create({ name, ImageUrl: imageUrl });

    res.status(200).json({ message: "Category saved successfully", data: newCategory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET ALL CATEGORIES
router.get("/categories", async (req, res) => {
  try {
    const categories = await category.find();
    if (!categories.length) return res.status(404).json({ message: "No categories found" });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE CATEGORY
router.delete("/catdelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await category.findByIdAndDelete(id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully", deletedCategory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// =====================
// PRODUCT ROUTES
// =====================

// GET PRODUCTS BY CATEGORY
router.get("/Shop/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    console.log("🔍 Searching for category:", categoryName);

    let products;

    // Try to find by category name (string) first
    products = await productDatabase.find({ category: categoryName });
    console.log("📦 Products found by name:", products);

    // If no products found by name, try by category ObjectId
    if (!products.length) {
      const categoryDoc = await category.findOne({ name: categoryName });
      if (categoryDoc) {
        products = await productDatabase.find({ category: categoryDoc._id });
        console.log("📦 Products found by ID:", products);
      }
    }

    if (!products.length) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("🚨 Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ADD PRODUCT
// ADD PRODUCT - UPDATED TO ACCEPT IMAGE URL
router.post("/productpost", upload.single("image"), async (req, res) => {
  try {
    const { productname, description, price, category, imageUrl } = req.body;

    // Validate required fields
    if (!productname || !description || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Use uploaded image OR provided imageUrl from request body
    const finalImageUrl = req.file ? req.file.path : imageUrl;

    const newProduct = await productDatabase.create({
      productname,
      description,
      price,
      category,
      imageUrl: finalImageUrl  // Add this line to save the image URL
    });

    res.status(200).json({
      message: "✅ Product added successfully",
      data: newProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


// DELETE PRODUCT
router.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productDatabase.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET ALL PRODUCTS
router.get("/productget", async (req, res) => {
  try {
    const products = await productDatabase.find().sort({ createdAt: -1 });
    if (!products.length) return res.status(404).json({ message: "No products found" });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
