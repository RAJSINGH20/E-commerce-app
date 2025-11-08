import express from "express";
import upload from "../middleware/multer.js";
import {
  adminlogin,
  login,
  logout,
  registration,
<<<<<<< HEAD
} from "../controller/authcoontroller.js";
import { getcurrentUser } from "../controller/usercontroller.js";
import IsAuthMiddleware from "../middleware/IsAuthMiddleware.js"; // ✅ import auth middleware

const authRoutes = express.Router();

// ✅ Public routes
authRoutes.post("/register", upload.single("profileImage"), registration);
authRoutes.post("/login", login);
=======
} from "../controller/authcoontroller.js"; // ✅ fixed spelling
import { getcurrentUser } from "../controller/usercontroller.js";

const authRoutes = express.Router();

// ✅ Routes
authRoutes.post("/register", upload.single("profileImage"), registration); // example if you upload a file
authRoutes.post("/login",getcurrentUser, login);
authRoutes.post("/logout", logout);
>>>>>>> 4527c894244b91a310113a385744b68fb90161bc
authRoutes.post("/adminlogin", adminlogin);

// ✅ Protected routes (require token)
authRoutes.get("/getcurrentUser", IsAuthMiddleware, getcurrentUser);
authRoutes.post("/logout", logout);

export default authRoutes;
