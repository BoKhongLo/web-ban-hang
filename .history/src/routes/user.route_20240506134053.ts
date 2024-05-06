import express from "express";
import { getUserByIdController, editUserByIdController } from "../controllers/users.controller";
import passport from "passport";

const routerUser = express.Router();

routerUser.get("/detail", passport.authenticate("jwt", { session: false }) ,getUserByIdController);
routerUser.patch("/edit", passport.authenticate("jwt", { session: false }), editUserByIdController);
routerUser.pu("/edit", passport.authenticate("jwt", { session: false }), editUserByIdController);
routerUser.patch("/edit", passport.authenticate("jwt", { session: false }), editUserByIdController);
export { routerUser };
