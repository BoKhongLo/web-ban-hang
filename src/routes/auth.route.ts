import express from "express";
import {loginController, signInController, sendOtpController, verifyOtpController, refreshController} from "../controllers/auth.controller"

const routerAuth = express.Router();
routerAuth.post("/signin", signInController);
routerAuth.post("/login", loginController);
routerAuth.post("/createOtp", sendOtpController);
routerAuth.post("/verifyOtp", verifyOtpController);
routerAuth.get("/refreshToken", refreshController);


export { routerAuth };
