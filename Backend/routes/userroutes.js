import express from 'express';
import { getcurrentUser,  } from '../controller/usercontroller.js';
import IsAuthMiddleware from '../middleware/isauthmiddleware.js';
import genToken from '../config/token.js';

const userroutes = express.Router();

userroutes.post('/getcurrentUser', genToken, getcurrentUser);

export default userroutes;