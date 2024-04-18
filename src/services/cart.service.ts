import { Types } from "mongoose";
import { CartModel, ICartItem, IDeliveryInfo } from "../models";
import createId from "../utils/generater";

export async function createCartService(userId: string) {
  try {
    const cart = new CartModel();
    cart.id = createId(userId, CartModel);
    cart.items = new Types.DocumentArray<ICartItem>([]);
    cart.shippingAddress = new Types.DocumentArray<IDeliveryInfo>([]);
    await cart.save();
    return cart.toJSON() 
  }
  catch {
    return null
  }
}