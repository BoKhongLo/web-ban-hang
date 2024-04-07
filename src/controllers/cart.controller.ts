import { body, validationResult } from "express-validator";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { CartDto } from "dtos/cart/cart.dto";

const addToCart = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new CartDto();

};
const removeFromCart = async (req: Request, res: Response) => {};
const removeAllFromCart = async (req: Request, res: Response) => {};

export { addToCart, removeAllFromCart, removeFromCart };