import { Types } from "mongoose";
import { CartModel, ICartItem, IDeliveryInfo } from "../models";
import createId from "../utils/generater";

export async function createCartService(userId: string) {
  try {
    const cart = new CartModel();
    cart.id =  await createId(userId, CartModel);
    cart.items = new Types.DocumentArray<ICartItem>([]);
    cart.shippingAddress = new Types.DocumentArray<IDeliveryInfo>([]);
    cart.userId = userId; 
    await cart.save();
    return cart.toJSON().id;
  }
  catch (error) {
    console.error("Error creating cart:", error);
    return null;
  }
}