import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/ProductRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static files from the correct location (../uploads)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Optional test route
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(5000, () => console.log("Server running on port 5000"));
