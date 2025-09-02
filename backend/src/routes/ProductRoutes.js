import express from "express";
import Product from "../models/Product.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Multer dynamic storage by category
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let category = req.body.category; // men, women, kids
    if (!category) return cb(new Error("Category is required"), null);

    category = category.toLowerCase(); 
    const uploadPath = path.join("uploads", category);
    fs.mkdirSync(uploadPath, { recursive: true }); // create folder if not exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// ✅ GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET all products of a category
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST product with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    // Ensure the category is always lowercase
    const category = req.body.category.toLowerCase(); 

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${category}/${
          req.file.filename
        }`
      : "";

    const product = new Product({
      name,
      price,
      description,
      category, // Save the lowercased version
      image: imageUrl,
    });
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT update product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Ensure the final category is lowercase
    const finalCategory = (category || existingProduct.category).toLowerCase();

    const updateData = {
      name: name || existingProduct.name,
      price: price || existingProduct.price,
      description: description || existingProduct.description,
      category: finalCategory, // Save the lowercased version
    };

    if (req.file) {
      updateData.image = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${finalCategory}/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
