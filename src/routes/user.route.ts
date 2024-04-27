import express from "express";
import { getUserByIdController, updateUserDetails } from "../controllers/users.controller";
import passport from "passport";

const routerUser = express.Router();

routerUser.get("/detail/:slug", passport.authenticate("jwt", { session: false }),getUserByIdController);
routerUser.post("/update", updateUserDetails);
export { routerUser };
