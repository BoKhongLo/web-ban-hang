import { createVnpayController } from "controllers/payment.controller";
import { createOrderController, getOrderByIdController, getOrderUserController } from "../controllers/orders.controller";
import express from "express";
import passport from "passport";

const routerPayment = express.Router();
routerPayment.get('/vnpay/create', passport.authenticate("jwt", { session: false }),createVnpayController);

export { routerPayment };