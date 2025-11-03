import { json } from "express";



export const AddProduct = async(req,res) => {
    try {
        console.log("AddProduct request body:", req.body);
        const {name,description,price,category,subcategory,size,bestsellers} = req.body;
        console.log(req.body);

        const image=  await uploadToCloudinary(req.files.image[0].path, 'products')
        const image1=  await uploadToCloudinary(req.files.image1[0].path, 'products')
        const image2=  await uploadToCloudinary(req.files.image2[0].path, 'products')
        const image3=  await uploadToCloudinary(req.files.image3[0].path, 'products')

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