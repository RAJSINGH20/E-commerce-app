import express from 'express';
import { getcurrentUser,  } from '../controller/usercontroller.js';
import IsAuthMiddleware from '../middleware/isauthmiddleware.js';

const userroutes = express.Router();

userroutes.get('/getcurrentUser', IsAuthMiddleware, getcurrentUser);

export default userroutes;