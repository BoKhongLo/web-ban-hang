import {
  uploadFileController,
  getFileController,
} from "../controllers/media.controller";
import express from "express";
import { uploadFile } from "../services/media.service";
import passport from "passport";

const routerMedia = express.Router();
routerMedia.get("/file/:slug", getFileController);
routerMedia.post(
  "/upload",
  uploadFile.array("files"),
  passport.authenticate("jwt", { session: false }),
  uploadFileController
);

export { routerMedia };
