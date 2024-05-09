import express from "express";
import { getCartByIdController, updateCartController } from "../controllers/cart.controller";
import passport from "passport";

const routerOrder = express.Router();
routerOrder.post('/new', passport.authenticate("jwt", { session: false }),updateOrderController);
routerOrder.get('/detail', passport.authenticate("jwt", { session: false }), getOrderByIdController);
export { routerOrder };