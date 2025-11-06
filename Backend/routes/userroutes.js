import express from 'express';
import { getadmin, getcurrentUser,  } from '../controller/usercontroller.js';
import IsAuthMiddleware from '../middleware/isauthmiddleware.js';
import genToken from '../config/token.js';
import AdminAuth from '../middleware/AdminAuthMiddleware.js';

const userroutes = express.Router();

userroutes.post("/getcurrentUser", IsAuthMiddleware, getcurrentUser);

userroutes.post('/getAdmin', AdminAuth, getadmin);

export default userroutes;