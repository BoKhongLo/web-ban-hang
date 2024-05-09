import { createOrderController, getOrderByIdController, getOrderUserController } from "../controllers/orders.controller";
import express from "express";
import passport from "passport";

const routerPayment = express.Router();
routerPayment.post('/create', passport.authenticate("jwt", { session: false }), createPaymentController);
routerPayment.get('/user', passport.authenticate("jwt", { session: false }), getPaymentUserController);
routerPayment.get('/id/:slug', passport.authenticate("jwt", { session: false }), getPaymentByIdController);

export { routerPayment };