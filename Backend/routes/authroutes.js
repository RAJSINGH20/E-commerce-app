import express from "express";
import { AddProduct } from "../controller/productcontroller";
import upload from "../middleware/multer";

const productRoutes = express.Router();
productRoutes.post("/addproduct", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }]), AddProduct);

export default productRoutes;