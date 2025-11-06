import express from "express";
import upload from "../middleware/multer.js";
import {
  adminlogin,
  login,
  logout,
  registration,
} from "../controller/authcoontroller.js";
import { getcurrentUser } from "../controller/usercontroller.js";
import IsAuthMiddleware from "../middleware/IsAuthMiddleware.js"; // ✅ import auth middleware

const authRoutes = express.Router();

// ✅ Public routes
authRoutes.post("/register", upload.single("profileImage"), registration);
authRoutes.post("/login", login);
authRoutes.post("/adminlogin", adminlogin);

// ✅ Protected routes (require token)
authRoutes.get("/getcurrentUser", IsAuthMiddleware, getcurrentUser);
authRoutes.post("/logout", logout);

export default authRoutes;
