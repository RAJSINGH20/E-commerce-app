import Express from "express"
import { addtocart, currentuser, updatecart } from "../controller/Cartcontroller.js"
import IsAuthMiddleware from "../middleware/isauthmiddleware.js"

const cartroute = Express.Router()


cartroute.post("/get", IsAuthMiddleware, currentuser);
cartroute.post("/update", IsAuthMiddleware, updatecart);
cartroute.post("/current", IsAuthMiddleware, addtocart);




export default cartroute