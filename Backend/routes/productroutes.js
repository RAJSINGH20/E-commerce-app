import express from "express";
import upload from "../middleware/multer.js";
import { AddProduct } from "../controller/productcontroller.js";

const productroutes = express.Router();

productroutes.post("/AddProduct", upload.fields([
    
    { name: "Image", maxCount: 1 },
    { name: "Image1", maxCount: 1 },
    { name: "Image2", maxCount: 1 },
    { name: "Image3", maxCount: 1 }]),AddProduct
)


export default productroutes;