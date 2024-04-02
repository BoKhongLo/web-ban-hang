import express from "express";
import {loginController, signInController} from "../controllers/auth.controller"

const routerAuth = express.Router();
routerAuth.post("/signin", signInController);
routerAuth.post("/login", loginController);
export { routerAuth };
