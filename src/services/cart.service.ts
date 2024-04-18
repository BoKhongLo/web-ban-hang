import { Types } from "mongoose";
import { CartDto } from "../dtos/cart";
import { CartModel, ICartItem, IDeliveryInfo } from "../models";
import * as otpGenerator from "otp-generator";
import { v5 as uuidv5 } from "uuid";

export async function createCartService(dto: CartDto) {
  try {
    const cart = new CartModel();
    cart.userId = dto.userId.toString();
    let idCart: string = uuidv5(dto.userId + 'userCart', uuidv5.URL);
    console.log('id cart', idCart);
    cart.id = idCart;
    cart.items = new Types.DocumentArray<ICartItem>([]);
    cart.totalItemCount = "";
    cart.totalPrice = "";
    cart.shippingAddress = new Types.DocumentArray<IDeliveryInfo>([]);
    await cart.save();
    return { data: { ...cart.toJSON() }, status: 200 };
  } catch (error) {
    console.error(error);
    return { data: { error: "Create failed" }, status: 500 };
  }
}