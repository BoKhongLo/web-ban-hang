import { createOrderController } from "../controllers/orders.controller";
import express from "express";
import passport from "passport";

const routerOrder = express.Router();
routerOrder.post('/create', passport.authenticate("jwt", { session: false }), createOrderController);
routerOrder.get('/create', passport.authenticate("jwt", { session: false }), createOrderController);
routerOrder.post('/create', passport.authenticate("jwt", { session: false }), createOrderController);

export { routerOrder };