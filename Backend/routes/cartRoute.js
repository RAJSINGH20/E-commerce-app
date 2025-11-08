import Express from "express";
import { addtocart, currentuser, updatecart } from "../controller/Cartcontroller.js";
import IsAuthMiddleware from "../middleware/IsAuthMiddleware.js";

const cartroute = Express.Router();

cartroute.post("/add", IsAuthMiddleware, addtocart);
cartroute.post("/update", IsAuthMiddleware, updatecart);
cartroute.post("/get", IsAuthMiddleware, currentuser);

export default cartroute;
