import { createOrderController, getOrderByIdController, getOrderUserController } from "../controllers/orders.controller";
import express from "express";
import passport from "passport";

const routerPayment = express.Router();
routerPayment.get('/user', passport.authenticate("jwt", { session: false }), getPaymentUserController);

export { routerPayment };