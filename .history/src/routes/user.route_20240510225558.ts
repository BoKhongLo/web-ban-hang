import express from "express";
import { getUserByIdController, editUserByIdController, addHeartProductController, removeHeartProductController, editRoleController, getAllUserController } from "../controllers/users.controller";
import passport from "passport";

const routerUser = express.Router();

routerUser.get("/detail", passport.authenticate("jwt", { session: false }), getUserByIdController);
routerUser.get("/all", passport.authenticate("jwt", { session: false }), getAllUserController);
routerUser.patch("/edit", passport.authenticate("jwt", { session: false }), editUserByIdController);
routerUser.put("/add-heart", passport.authenticate("jwt", { session: false }), addHeartProductController);
routerUser.put("/remove-heart", passport.authenticate("jwt", { session: false }), removeHeartProductController);
routerUser.put('/role', passport.authenticate("jwt", { session: false }), editRoleController)

export { routerUser };
