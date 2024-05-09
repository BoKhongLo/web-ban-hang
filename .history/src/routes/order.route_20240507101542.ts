import express from "express";
import { getCartByIdController, updateCartController } from "../controllers/cart.controller";
import passport from "passport";

const routerCart = express.Router();
routerCart.patch('/update', passport.authenticate("jwt", { session: false }),updateCartController);
routerCart.get('/detail', passport.authenticate("jwt", { session: false }), getCartByIdController);
export { routerCart };