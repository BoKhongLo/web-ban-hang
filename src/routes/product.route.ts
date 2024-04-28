import express from "express";
import { addProductController, deleteProductController, editProductController, searchProductByContentController } from "../controllers/product.controller";
import passport from "passport";

const routerProduct = express.Router();
routerProduct.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  addProductController
);
routerProduct.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteProductController
)
routerProduct.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  editProductController
)

routerProduct.get(
  "/search:slug",
  passport.authenticate("jwt", { session: false }),
  searchProductByContentController
)
export { routerProduct };