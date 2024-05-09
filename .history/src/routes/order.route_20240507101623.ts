import { createOrderController } from "controllers/orders.controller";
import express from "express";
import passport from "passport";

const routerOrder = express.Router();
routerOrder.post('/new', passport.authenticate("jwt", { session: false }), createOrderController);

export { routerOrder };