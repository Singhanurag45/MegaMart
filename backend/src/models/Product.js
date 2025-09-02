import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: {
    type: String,
    enum: ["men", "women", "kids"], // only these values allowed
    lowercase: true, // will automatically save in lowercase
  },
  description: String,
});

export default mongoose.model("Product", productSchema);
