import { body, validationResult } from "express-validator";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { getCartByIdService, updateCartService} from "../services/cart.service";
import { updateCartDto } from "../dtos/cart";

const updateCartController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new updateCartDto();
  dto.userId = req.user["id"];
  dto.productId = req.body.productId;
  dto.quantity = req.body.quantity;
  dto.color = req.body.color;
  dto.size = req.body.size;
  try {
    validate(dto).then((errors) => {
      if (errors.length > 0) {
        res.status(500).json({ errors: errors });
      }
    });
  } catch (err) {
    console.error(err);
  }
  const returnData = await updateCartService(dto);
  return res.status(returnData.status).json(returnData.data);
}

const getCartByIdController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const returnData = await getCartByIdService(req.user["id"]);
  return res.status(returnData.status).json(returnData.data);
}
export {updateCartController, getCartByIdController}