import { CartModel } from "models";

export async function createOderService(dto: updateCartDto) {
    try {
      let cart = await CartModel.findOne({ userId: dto.userId });
      if (!cart) {
        return { data: { error: "Cart is not exist" }, status: 401 };
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