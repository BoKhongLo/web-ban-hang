import { updateCartDto } from "dtos/cart";
import { createOderDto } from "dtos/order";
import { CartModel, OrderModel } from "models";
import createId from "utils/generater";

export async function createOderService(dto: createOderDto) {
    try {
      let cart = await CartModel.findOne({ userId: dto.userId });
      if (!cart) {
        return { data: { error: "Cart is not exist" }, status: 401 };
      }
      if (cart.items.length <= 0) {
        return { data: { error: "Cart hasn't items" }, status: 401 };
      }
      let newOrder = new OrderModel();
      newOrder.id = await createId(dto.userId + "Order", CartModel);
      newOrder.listProducts = cart.items;
      newOrder.deliveryInfo = dto.deliveryInfo;
      newOrder.personalDetails = dto.personalDetails;
      let paymentApplied = ["VNPAY", "COD"]
      if (dto.deliveryInfo.inc)
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