import express from "express";
import upload from "../middleware/multer.js"; // ✅ add .js extension (ESM requires it)
import {
  adminlogin,
  login,
  logout,
  registration,
} from "../controller/authcoontroller.js"; // ✅ fixed spelling

const authRoutes = express.Router();

// ✅ Routes
authRoutes.post("/register", upload.single("profileImage"), registration); // example if you upload a file
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/adminlogin", adminlogin);

export default authRoutes;
