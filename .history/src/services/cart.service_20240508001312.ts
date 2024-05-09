import { Types, Mongoose, ObjectId, Schema } from "mongoose";
import { CartModel, ICartItem, ProductModel } from "../models";
import createId from "../utils/generater";
import { updateCartDto } from "../dtos/cart";

export async function createCartService(userId: string) {
  try {
    const cart = new CartModel();
    cart.id = await createId(userId, CartModel);
    cart.items = new Types.DocumentArray<ICartItem>([]);
    cart.userId = userId;
    await cart.save();
    return cart.toJSON().id;
  } catch (error) {
    console.error("Error creating cart:", error);
    return null;
  }
}

export async function updateCartService(dto: updateCartDto) {
  try {
    let cart = await CartModel.findOne({ userId: dto.userId });
    if (!cart) {
      return { data: { error: "Cart is not exist" }, status: 401 };
    }
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === dto.productId
    );

    let checkProduct = await  ProductModel.findOne({ id: dto.productId });

    if (!checkProduct) {
      return { data: { error: "Product is not exist" }, status: 401 };
    }

    let dataProduct = checkProduct.toJSON();

    if (dataProduct.color.findIndex(i => i.toLocaleLowerCase() === dto.color.toLocaleLowerCase()) == -1) {
      return { data: { error: "Color is not exist" }, status: 401 };
    }

    if (dataProduct.size.findIndex(i => i.toLocaleLowerCase() === dto.size.toLocaleLowerCase()) == -1) {
      return { data: { error: "Size is not exist" }, status: 401 };
    }
    
    if (dataProduct.stockQuantity < dto.quantity) {
      return { data: { error: "Out of stock" }, status: 401 };
    }
    const newItem: ICartItem = {
      productId: dto.productId,
      quantity: dto.quantity,
      size: dto.size,
      color: dto.color,
      price: dataProduct.price,
    };
    if (existingItemIndex !== -1) {
      if (dto.quantity <= 0) {
        let newItems = cart.items.filter(item => item.productId !== dto.productId);
        cart.items = new Types.DocumentArray<ICartItem>(newItems);
      }
      else {
        cart.items[existingItemIndex].productId = newItem.productId;
        cart.items[existingItemIndex].quantity = newItem.quantity;
        cart.items[existingItemIndex].size = newItem.size;
        cart.items[existingItemIndex].color = newItem.color;
        cart.items[existingItemIndex].price = newItem.price;
      }
    } 
    else {
      cart.items.push(newItem);
    }
    let newTotalPrice = 0;
    let newTotalItemsCount = 0;
    for (let i = 0; i < cart.items.length; i++) {
      newTotalPrice += cart.items[i].price * cart.items[i].quantity;
      newTotalItemsCount += cart.items[i].quantity;
    }
    cart.totalPrice = newTotalPrice;
    cart.totalItemCount = newTotalItemsCount;
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

export async function getCartByIdService(userId: string) {
  try {
    let cart = await CartModel.findOne({ userId: userId });
    if (!cart) {
      return { data: { error: "Cart is not exist" }, status: 401 };
    }
    return { data: { ...cart.toJSON() }, status: 200 };
  } catch (error) {
    console.error("Error creating cart:", error);
    return null;
  }
}
