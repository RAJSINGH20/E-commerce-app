import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import cookieParser from "cookie-parser";
import authroutes from "./routes/authroutes.js";
import cors from "cors";
import userroutes from "./routes/userroutes.js";
import productroutes from "./routes/productroutes.js";
import cartroute from "./routes/cartRoute.js";

dotenv.config();

let port = process.env.PORT || 3000;

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authroutes);
app.use("/api/user", userroutes);
app.use("/api/cart", cartroute);
console.log("Product routes loaded");
console.log("enter index.js");
app.use("/api/product", productroutes);

app.listen(port, () => {
  connectdb();
  console.log(`Server is running on http://localhost:${port}`);
});