import { getAllRoomchatController, getRoomchatByIdController, getRoomchatUserController } from "../controllers/roomchat.controller";
import express from "express";
import passport from "passport";

const routerRoomchat = express.Router();

routerRoomchat.get(
  "/id/:slug",
  passport.authenticate("jwt", { session: false }),
  getRoomchatByIdController
);

routerRoomchat.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  getAllRoomchatController
)

routerRoomchat.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  getRoomchatUserController
)
export { routerRoomchat };