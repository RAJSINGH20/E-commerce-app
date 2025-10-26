import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import cookieParser from "cookie-parser";
import authroutes from "./routes/authroutes.js";
import cors from "cors";
import userroutes from "./routes/userroutes.js";

dotenv.config();

let port = process.env.PORT || 3000;

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authroutes);
app.use("/api/user", userroutes);

app.listen(port, () => {
  connectdb();
  console.log(`Server is running on http://localhost:${port}`);
});