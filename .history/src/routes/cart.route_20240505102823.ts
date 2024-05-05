import express from "express";
import { updateCartController, editCartController } from "../controllers/cart.controller";

const routerCart = express.Router();
routerCart.post('/add', addToCartController);
routerCart.post('/edit', editCartController )
export { routerCart };