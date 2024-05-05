import express from "express";
import { addProductController, deleteProductController, editProductController, getAllProductController, getProductByIdController, searchProductByContentController } from "../controllers/product.controller";
import passport from "passport";

const routerProduct = express.Router();
routerProduct.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  addProductController
);
routerProduct.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteProductController
)
routerProduct.patch(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  editProductController
)
routerProduct.get(
  "/search/:slug",
  passport.authenticate("jwt", { session: false }),
  searchProductByContentController
)
routerProduct.get(
  "/all",
  getAllProductController
)
routerProduct.get(
  "/id/:slug",
  getProductByIdController
)
export { routerProduct };