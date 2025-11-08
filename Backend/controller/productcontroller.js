import Product from "../model/product_model.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

// ✅ Add Product
export const AddProduct = async (req, res) => {
  try {
    console.log("📸 Files received:", req.files);

    const { name, description, price, category, subcategory, size, stock, bestseller } = req.body;

    // ✅ Upload all images to Cloudinary using their local paths
    const uploadImage = async (field) => {
      if (req.files && req.files[field] && req.files[field][0]) {
        const localPath = req.files[field][0].path;
        const uploaded = await uploadToCloudinary(localPath, "products");
        return uploaded.secure_url;
      }
      return null;
    };

    // Upload 4 images
    const image = await uploadImage("image");
    const image1 = await uploadImage("image1");
    const image2 = await uploadImage("image2");
    const image3 = await uploadImage("image3");

    // ✅ Validate all 4 images
    if (!image || !image1 || !image2 || !image3) {
      return res.status(400).json({
        success: false,
        message: "All 4 images are required",
        filesReceived: req.files,
      });
    }

    // ✅ Create product document
    const product = new Product({
      name,
      description,
      category,
      subcategory,
      price,
      bestseller: bestseller === "true", // convert string to boolean if sent from form
      size: JSON.parse(size), // assuming size is sent as JSON string
      stock,
      image,
      image1,
      image2,
      image3,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "✅ Product added successfully",
      product,
    });
  } catch (error) {
    console.error("❌ AddProduct error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Products
export const GetProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ GetProducts error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Remove Product
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "🗑️ Product deleted successfully" });
  } catch (error) {
    console.error("❌ removeProduct error:", error);
    res.status(500).json({ message: error.message });
  }
};
