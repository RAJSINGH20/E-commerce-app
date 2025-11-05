import Express from "express"
import { addtocart, currentuser, updatecart } from "../controller/Cartcontroller.js"
import IsAuthMiddleware from "../middleware/isauthmiddleware.js"

const cartroute = Express.Router()


cartroute.post("/get",IsAuthMiddleware, updatecart)
cartroute.post("/add",IsAuthMiddleware, addtocart)
cartroute.post("/update",IsAuthMiddleware, currentuser)




export default cartroute