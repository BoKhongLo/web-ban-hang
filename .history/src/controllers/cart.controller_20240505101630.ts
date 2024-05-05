import { body, validationResult } from "express-validator";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { CartDto, addToCartDto, eidtCartDto } from "../dtos/cart";
import { addToCartService} from "../services/cart.service";

const addToCartController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new addToCartDto();
  dto.idCart = req.body.idCart;
  dto.idProduct = req.body.idProduct;
  dto.quantity = req.body.quantity;
  validate(dto).then((errors) => {
    if (errors.length > 0) {
      res.status(500).json({ errors: errors });
    }
  });
  const returnData = await addToCartService(dto);
  return res.status(returnData.status).json(returnData.data);
}

export {addToCartController}