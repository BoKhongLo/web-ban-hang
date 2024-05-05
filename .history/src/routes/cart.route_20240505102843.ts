import express from "express";
import { updateCartController } from "../controllers/cart.controller";

const routerCart = express.Router();
routerCart.patch('/update', addToCartController);
export { routerCart };