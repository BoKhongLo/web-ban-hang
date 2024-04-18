import { body, validationResult } from "express-validator";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { CartDto } from "../dtos/cart";
import { createCartService } from "../services/cart.service";
const createCartController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const dto = new CartDto();
  dto.id = req.body.id;
  dto.userId = req.body.userId;
  dto.items = req.body.items;
  dto.totalPrice = req.body.totalPrice;
  dto.totalItemCount = req.body.totalItemCount;
  dto.shippingAddress = req.body.shippingAddress;

  validate(dto).then((errors) => {
    if (errors.length > 0) {
      res.status(501).json({ errors: errors });
    }
  });

  const returnData = await createCartService(dto);
  return res.status(returnData.status).json(returnData.data);
}

export {createCartController}