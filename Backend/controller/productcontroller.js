import Product from "../model/product_model.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

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

    const image = await uploadImage("image");
    const image1 = await uploadImage("image1");
    const image2 = await uploadImage("image2");
    const image3 = await uploadImage("image3");

    if (!image || !image1 || !image2 || !image3) {
      return res.status(400).json({
        success: false,
        message: "All 4 images are required",
      });
    }

    const product = new Product({
      name,
      description,
      category,
      subcategory,
      price,
      bestseller: bestseller === "true",
      size: JSON.parse(size),
      stock,
      image,
      image1,
      image2,
      image3,
    });

    await product.save();
    res.status(201).json({ success: true, message: "✅ Product added", product });
  } catch (error) {
    console.error("❌ AddProduct error:", error);
    res.status(500).json({ success: false, message: error.message });
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