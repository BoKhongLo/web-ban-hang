import express from "express";
import { addProductController, deleteProductController, editProductController, searchProductByContentController } from "../controllers/product.controller";
import passport from "passport";

const routerProduct = express.Router();
routerProduct.post(
  "/addProduct",
  // passport.authenticate("jwt", { session: false }),
  addProductController
);
routerProduct.post(
  "/deleteProduct",
  passport.authenticate("jwt", { session: false }),
  deleteProductController
)
routerProduct.post(
  "/editProduct",
  passport.authenticate("jwt", { session: false }),
  editProductController
)
routerProduct.get(
  "/searchProductByProductType",
  // passport.authenticate("jwt", { session: false }),
  searchProductByContentController
)
export { routerProduct };