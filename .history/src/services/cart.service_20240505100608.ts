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

export async function addToCartService(dto: addToCartDto) {
  try {
    const cart = await CartModel.findOne({ id: dto.idCart });
    if (!cart) {
      return { data: { error: "cart is not exist" }, status: 401 };
    }
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === dto.idProduct
    );
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += dto.quantity;
    } else {
      const newItem: ICartItem = {
        productId: dto.idProduct,
        quantity: dto.quantity,
      };
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

// export async function editCartService(dto: editCartDto) {
//   try {
//     const cart = await CartModel.findOne({ id: dto.idCart });
//     if (!cart) {
//       return { data: { error: "cart is not exist" }, status: 401 };
//     }
//     if (dto.editChoice === "deleteAllProducts") {
//       // Clear all items in the cart
//       cart.items = [];
//       await cart.save();
//     } else if (dto.editChoice === "increaseOneById") {
//       // Increase quantity of a specific product by ID
//       const itemToIncrease = cart.items.find(
//         (item) => item.productId === dto.idProduct
//       );

//       if (itemToIncrease) {
//         itemToIncrease.quantity += 1;
//         await cart.save();
//       }
//     } else if (dto.editChoice === "decreaseOneById") {
//       // Decrease quantity of a specific product by ID
//       const itemToDecrease = cart.items.find(
//         (item) => item.productId === dto.idProduct
//       );

//       if (itemToDecrease && itemToDecrease.quantity > 1) {
//         itemToDecrease.quantity -= 1;
//         await cart.save();
//       }
//     } else if (dto.editChoice === "deleteOneProductById") {
//       // Delete a specific product from the cart by ID
//       const updatedItems = cart.items.filter(
//         (item) => item.productId !== dto.idProduct
//       );
//       cart.items = updatedItems;
//       await cart.save();
//     }
//     return {
//       data: { ...cart.toJSON() },
//       status: 200,
//     };
//   } catch (error) {
//     console.error(error);
//     return { data: { error: "Edit failed" }, status: 500 };
//   }
// }
