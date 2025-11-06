import { uploadToCloudinary } from "../config/cloudinary.js";
import Product from "../model/product_model.js";


export const AddProduct = async (req, res) => {
  try {
    console.log("📸 Files received:", req.files);

    const { name, description, price, category, subcategory, size, stock, bestseller } = req.body;

    // ✅ Upload images only if provided
    const imageUpload = req.files?.image ? await uploadToCloudinary(req.files.image[0]) : null;
    const image1Upload = req.files?.image1 ? await uploadToCloudinary(req.files.image1[0]) : null;
    const image2Upload = req.files?.image2 ? await uploadToCloudinary(req.files.image2[0]) : null;
    const image3Upload = req.files?.image3 ? await uploadToCloudinary(req.files.image3[0]) : null;

    // ✅ Verify all images are present
    if (!imageUpload || !image1Upload || !image2Upload || !image3Upload) {
      return res.status(400).json({
        success: false,
        message: "All 4 images are required",
        filesReceived: req.files,
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
      image: imageUpload.secure_url,
      image1: image1Upload.secure_url,
      image2: image2Upload.secure_url,
      image3: image3Upload.secure_url,
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