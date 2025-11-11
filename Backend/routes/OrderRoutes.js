import express from "express"
import IsAuthMiddleware from "../middleware/IsAuthMiddleware.js";
import { placeOrder } from "../controller/odercontroller.js";

const OrderRoutes = express.Router();

OrderRoutes.post('/placeOrder',IsAuthMiddleware,placeOrder)



export default OrderRoutes