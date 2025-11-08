import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a local file to Cloudinary
 * @param {string} localFilePath - Path of the file to upload
 * @param {string} folder - Cloudinary folder name (default: "products")
 * @returns {Promise<object>} - Cloudinary upload response
 */
export const uploadToCloudinary = async (localFilePath, folder = "products") => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder,
      resource_type: "auto", // allows image, video, etc.
    });
    console.log("✅ Uploaded to Cloudinary:", result.secure_url);
    return result;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    throw new Error("Cloudinary upload failed");
  }
};

export default cloudinary;
