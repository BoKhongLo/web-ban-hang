import { createOderDto } from "dtos/order";
import express from "express";
import passport from "passport";

const routerOrder = express.Router();
routerOrder.post('/new', passport.authenticate("jwt", { session: false }), createOderDto);

export { routerOrder };