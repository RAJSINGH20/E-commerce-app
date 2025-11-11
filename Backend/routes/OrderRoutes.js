import express from "express"
import IsAuthMiddleware from "../middleware/IsAuthMiddleware.js";
import { getorder, placeOrder } from "../controller/odercontroller.js";

const OrderRoutes = express.Router();

OrderRoutes.post('/placeOrder',IsAuthMiddleware,placeOrder)
OrderRoutes.get('/getOrder',IsAuthMiddleware,getorder)



export default OrderRoutes