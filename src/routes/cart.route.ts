import express from "express";
import { addToCartController } from "../controllers/cart.controller";

const routerCart = express.Router();
routerCart.post('/addToCart', addToCartController);

export { routerCart };