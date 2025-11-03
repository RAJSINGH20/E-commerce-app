import { json } from "express";
import { uploadToCloudinary } from "../config/cloudinary.js";



export const AddProduct = async (req, res) => {
    try {
        console.log("AddProduct request body:", req.body);
        const { name, description, price, category, subcategory, size, bestsellers } = req.body;
        console.log(req.body);

        const image = req.files?.image ? await uploadToCloudinary(req.files.image[0].path, 'products') : null;
        const image1 = req.files?.image1 ? await uploadToCloudinary(req.files.image1[0].path, 'products') : null;
        const image2 = req.files?.image2 ? await uploadToCloudinary(req.files.image2[0].path, 'products') : null;
        const image3 = req.files?.image3 ? await uploadToCloudinary(req.files.image3[0].path, 'products') : null;


        let productdata = {
            name,
            description,
            price: Number(price),
            category,
            subcategory,
            size: JSON.parse(size),
            date: Date.now(),
            bestsellers: bestsellers === 'true' ? true : false,
            image,
            image1,
            image2,
            image3
        }

        const newProduct = await Product.create(productdata);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


export const GetProducts = async (req, res) => {
    try {
        const product = await product.find();
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