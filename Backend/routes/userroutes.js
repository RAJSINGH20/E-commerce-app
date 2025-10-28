import express from 'express';
import { getcurrentUser,  } from '../controller/usercontroller.js';
import IsAuthMiddleware from '../middleware/isauthmiddleware.js';
import genToken from '../config/token.js';

const userroutes = express.Router();

userroutes.post('/getcurrentUser', getcurrentUser);

export default userroutes;