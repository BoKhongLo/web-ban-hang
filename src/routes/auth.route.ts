import express from "express";
import {loginController, signUpController, sendOtpController, verifyOtpController, refreshController} from "../controllers/auth.controller"

const routerAuth = express.Router();
routerAuth.post("/signup", signUpController);
routerAuth.post("/login", loginController);
routerAuth.post("/createOtp", sendOtpController);
routerAuth.post("/verifyOtp", verifyOtpController);
routerAuth.get("/refreshToken", refreshController);


export { routerAuth };
