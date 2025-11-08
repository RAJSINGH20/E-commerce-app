import express from "express";
import upload from "../middleware/multer.js";
import {
  adminlogin,
  login,
  logout,
  registration,
} from "../controller/authcoontroller.js"; // ✅ fixed spelling (was 'authcoontroller')
import { getcurrentUser } from "../controller/usercontroller.js";
import IsAuthMiddleware from "../middleware/IsAuthMiddleware.js"; // ✅ middleware import

const authRoutes = express.Router();

// ✅ Public Routes
authRoutes.post("/register", upload.single("profileImage"), registration);
authRoutes.post("/login", login);
authRoutes.post("/adminlogin", adminlogin);
authRoutes.post("/logout", logout);

// ✅ Protected Route (requires auth)
authRoutes.get("/getcurrentUser", IsAuthMiddleware, getcurrentUser);

export default authRoutes;
