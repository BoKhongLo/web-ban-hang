import express from "express";
import { updateCartController } from "../controllers/cart.controller";

const routerCart = express.Router();
routerCart.post('/add', addToCartController);
export { routerCart };