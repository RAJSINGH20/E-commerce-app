import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  price: { type: Number, required: true },
  bestseller: { type: Boolean, default: false },
  size: { type: [String], required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  image: { type: String, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
  date: { type: Date, default: Date.now }

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
