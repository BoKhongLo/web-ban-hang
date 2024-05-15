
import { cancelOrderController, createOrderController, getAllOrderController, getOrderByIdController, getOrderUserController, updateOrderController } from "../controllers/orders.controller";
import express from "express";
import passport from "passport";

const routerOrder = express.Router();
routerOrder.post('/create', passport.authenticate("jwt", { session: false }), createOrderController);
routerOrder.get('/user', passport.authenticate("jwt", { session: false }), getOrderUserController);
routerOrder.get('/id/:slug', passport.authenticate("jwt", { session: false }), getOrderByIdController);
routerOrder.delete('/cancel', passport.authenticate("jwt", { session: false }), cancelOrderController);
routerOrder.get('/all', passport.authenticate("jwt", { session: false }), getAllOrderController);
routerOrder.patch('/update', passport.authenticate("jwt", { session: false }), updateOrderController);


export { routerOrder };