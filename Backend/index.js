import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import cookieParser from "cookie-parser";
import authroutes from "./routes/authroutes.js";
import cors from "cors";
import userroutes from "./routes/userroutes.js";
import productroutes from "./routes/productroutes.js";
import cartroute from "./routes/cartRoute.js";
import OrderRoutes from "./routes/OrderRoutes.js";

dotenv.config();

const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://e-commerce-app-my4s.vercel.app',
  'https://e-commerce-app-qxne.vercel.app',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5173',
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({ success: true, message: "E-commerce API is running" });
});

app.use("/api", async (_req, _res, next) => {
  try {
    await connectdb();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/auth", authroutes);
app.use("/api/user", userroutes);
app.use("/api/cart", cartroute);
app.use("/api/product", productroutes);
app.use("/api/order", OrderRoutes);

app.use((error, _req, res, _next) => {
  console.error("API request failed:", error);
  res.status(503).json({
    success: false,
    message: "The API is temporarily unavailable",
  });
});

export default app;

if (!process.env.VERCEL) {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}