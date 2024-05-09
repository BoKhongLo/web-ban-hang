import { Types } from "mongoose";
import { createOderDto } from "../dtos/order";
import { CartModel, OrderModel } from "../models";
import createId from "../utils/generater";

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
      newOrder.userId = dto.userId;
      newOrder.listProducts = cart.items;
      newOrder.totalAmount = cart.totalPrice;
      newOrder.deliveryInfo = dto.deliveryInfo;
      newOrder.personalDetails = dto.personalDetails;
      let paymentApplied = ["VNPAY", "COD"]
      if (paymentApplied.includes(dto.paymentMethods)) {
        newOrder.paymentMethods = dto.paymentMethods.toUpperCase();
      }
      else {
        return { data: { error: "Payment Method is not exist" }, status: 401 };
      }
      let deliveryApplied = ["FAST", "STANDARD"]
      if (deliveryApplied.includes(dto.deliveryType)) {
        newOrder.deliveryType = dto.deliveryType.toUpperCase();
      }
      else {
        return { data: { error: "Payment Method is not exist" }, status: 401 };
      }
      newOrder.notes = dto.note;
      await newOrder.save();
      cart.items = new Types.DocumentArray<ICartItem>([]);
      
      return {
        data: { ...newOrder.toJSON() },
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return { data: { error: "Add failed" }, status: 500 };

    }
  }