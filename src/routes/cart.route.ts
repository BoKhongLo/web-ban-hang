import express from "express";
import { createCartController } from "../controllers/cart.controller";

const routerCart = express.Router();

routerCart.post("/createCart", createCartController);

export { routerCart };
