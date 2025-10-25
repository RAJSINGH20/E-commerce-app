import express from "express";
import {login ,registration , logout}  from "../controller/authcoontroller.js";

const authroutes = express.Router();
authroutes.post("/registration", registration);
authroutes.post("/login", login);
authroutes.post("/logout", logout);

export default authroutes;