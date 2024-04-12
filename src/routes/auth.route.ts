import express from "express";
import {loginController, signInController, sendOtpController, verifyOtpController} from "../controllers/auth.controller"

const routerAuth = express.Router();
routerAuth.post("/signin", signInController);
routerAuth.post("/login", loginController);
routerAuth.post("/createOtp", sendOtpController);
routerAuth.post("/verifyOtp", verifyOtpController);


export { routerAuth };
