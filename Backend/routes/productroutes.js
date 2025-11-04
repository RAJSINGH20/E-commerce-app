import express from "express";
import upload from "../middleware/multer.js";
import { AddProduct, GetProducts, removeProduct } from "../controller/productcontroller.js";
import Adminauth from "../middleware/AdminAuthMiddleware.js"




const productroutes = express.Router();

productroutes.post(
  "/addproduct",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  AddProduct
);
productroutes.get("/GetProducts",GetProducts)
productroutes.post("/removeproduct/:id",Adminauth,removeProduct)


export default productroutes;