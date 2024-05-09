import { createOrderController, getOrderByIdController, getOrderUserController } from "../controllers/orders.controller";
import express from "express";
import passport from "passport";

const router = express.Router();
router.post('/create', passport.authenticate("jwt", { session: false }), createController);
router.get('/user', passport.authenticate("jwt", { session: false }), getUserController);
router.get('/id/:slug', passport.authenticate("jwt", { session: false }), getByIdController);

export { router };