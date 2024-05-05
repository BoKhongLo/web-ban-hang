import express from "express";
import { updateCartController } from "../controllers/cart.controller";

const routerCart = express.Router();
routerCart.patch('/update', passport.authenticate("jwt", { session: false }),,updateCartController);
export { routerCart };