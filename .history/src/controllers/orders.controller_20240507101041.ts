import { body, validationResult } from "express-validator";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { getCartByIdService, updateCartService} from "../services/cart.service";
import { updateCartDto } from "../dtos/cart";
import { createOderDto } from "dtos/order";

const createOrderController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new createOderDto;
  dto.userId = req.user["id"];
  dto.paymentMethods
  validate(dto).then((errors) => {
    if (errors.length > 0) {
      res.status(500).json({ errors: errors });
    }
  });
  const returnData = await updateCartService(dto);
  return res.status(returnData.status).json(returnData.data);
}


export {createOrderController}