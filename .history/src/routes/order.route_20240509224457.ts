import { createOrderController, getOrderByIdController, getOrderUserController } from "../controllers/orders.controller";
import express from "express";
import passport from "passport";

const routerOrder = express.Router();
routerOrder.post('/create', passport.authenticate("jwt", { session: false }), createOrderController);
routerOrder.get('/user', passport.authenticate("jwt", { session: false }), getOrderUserController);
routerOrder.get('/id/:slug', passport.authenticate("jwt", { session: false }), getOrderByIdController);
routerOrder.get('/id/:slug', passport.authenticate("jwt", { session: false }), getOrderByIdController);


export { routerOrder };