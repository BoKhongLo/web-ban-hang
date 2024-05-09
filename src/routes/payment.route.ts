import { createVnpayController, validateOrderController } from "../controllers/payment.controller";

import express from "express";
import passport from "passport";

const routerPayment = express.Router();
routerPayment.get('/vnpay/create', passport.authenticate("jwt", { session: false }), createVnpayController);
routerPayment.get('/vnpay/validate', validateOrderController);

export { routerPayment };