import { editRoleController } from "controllers/users.controller";
import { cancelOrderController, createOrderController, getOrderByIdController, getOrderUserController } from "../controllers/orders.controller";
import express from "express";
import passport from "passport";

const routerOrder = express.Router();
routerOrder.post('/create', passport.authenticate("jwt", { session: false }), createOrderController);
routerOrder.get('/user', passport.authenticate("jwt", { session: false }), getOrderUserController);
routerOrder.get('/id/:slug', passport.authenticate("jwt", { session: false }), getOrderByIdController);
routerOrder.delete('/cancel', passport.authenticate("jwt", { session: false }), cancelOrderController);
routerOrder.put('/role', passport.authenticate("jwt", { session: false }), editRoleController)

export { routerOrder };