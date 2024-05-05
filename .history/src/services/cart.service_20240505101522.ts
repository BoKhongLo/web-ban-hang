import { Types, Mongoose } from "mongoose";
import { CartModel, ICartItem, IDeliveryInfo, ProducModel } from "../models";
import createId from "../utils/generater";
import { addToCartDto, editCartDto } from "../dtos/cart";

export async function createCartService(userId: string) {
  try {
    const cart = new CartModel();
    cart.id = await createId(userId, CartModel);
    cart.items = new Types.DocumentArray<ICartItem>([]);
    cart.shippingAddress = new Types.DocumentArray<IDeliveryInfo>([]);
    cart.userId = userId;
    await cart.save();
    return cart.toJSON().id;
  } catch (error) {
    console.error("Error creating cart:", error);
    return null;
  }
}

export async function updateCartService(dto: addToCartDto) {
  try {
    const cart = await CartModel.findOne({ userId: dto.userId });
    if (!cart) {
      return { data: { error: "Cart is not exist" }, status: 401 };
    }
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === dto.productId
    );
    const newItem: ICartItem = {
      productId: dto.productId,
      quantity: dto.quantity,
      size: dto.size,
      color: dto.color,
      price: dto.price
    };
    if (existingItemIndex !== -1) {
      if (dto.quantity <= 0) {
        let newItems = cart.items.filter(item => item.productId !== dto.productId);
        cart.items = new Types.DocumentArray<ICartItem>(newItems);
      }
      cart.items[existingItemIndex] = newItem;
    } 
    else {
      if (cart)
      cart.items.push(newItem);
    }
    await cart.save();
    return {
      data: { ...cart.toJSON() },
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { data: { error: "Add failed" }, status: 500 };
  }
}

