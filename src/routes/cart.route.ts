import express from "express";
import { addToCartController, editCartController } from "../controllers/cart.controller";

const routerCart = express.Router();
routerCart.post('/addToCart', addToCartController);
routerCart.post('/editCart', editCartController )
export { routerCart };