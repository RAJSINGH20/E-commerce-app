import Product from "../model/product_model.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const AddProduct = async (req, res) => {
  try {
    console.log("📸 Files received:", req.files);

    const { name, description, price, category, subcategory, size, stock, bestseller } = req.body;

<<<<<<< HEAD
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
=======
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
>>>>>>> 4527c894244b91a310113a385744b68fb90161bc
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
<<<<<<< HEAD
      image,
      image1,
      image2,
      image3,
=======
      image: imageUpload.secure_url,
      image1: image1Upload.secure_url,
      image2: image2Upload.secure_url,
      image3: image3Upload.secure_url,
>>>>>>> 4527c894244b91a310113a385744b68fb90161bc
    });

    await product.save();
    res.status(201).json({ success: true, message: "✅ Product added", product });
  } catch (error) {
    console.error("❌ AddProduct error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};





<<<<<<< HEAD

=======
>>>>>>> 4527c894244b91a310113a385744b68fb90161bc
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