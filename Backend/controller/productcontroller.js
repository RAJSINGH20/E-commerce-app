import { uploadToCloudinary } from "../config/cloudinary.js";
import Product from "../model/product_model.js";


export const AddProduct = async (req, res) => {
  try {
    console.log("AddProduct request body:", req.body);
    console.log("enter AddProduct");

    const { name, description, price, category, subcategory, size, stock, bestseller } = req.body;

    // Upload images one by one
    const imageUpload = await uploadToCloudinary(req.files?.Image);
    const image1Upload = await uploadToCloudinary(req.files?.Image1);
    const image2Upload = await uploadToCloudinary(req.files?.Image2);
    const image3Upload = await uploadToCloudinary(req.files?.Image3);

    // ✅ Use only secure_url for storing in DB
    const product = new Product({
      name,
      description,
      category,
      subcategory,
      price,
      bestseller: bestseller === "true",
      size: JSON.parse(size), // since you send as '["S","L","XXL"]'
      stock,
      image: imageUpload?.secure_url || "",
      image1: image1Upload?.secure_url || "",
      image2: image2Upload?.secure_url || "",
      image3: image3Upload?.secure_url || "",
    });

    await product.save();
    console.log("Product saved successfully");
    res.status(200).json({ success: true, message: "Product added successfully", product });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding product", error: error.message });
  }
};



export const GetProducts = async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export const removeProduct = async (req, res) => {
    try {

        let { id } = req.params;
        const product = await product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }

}