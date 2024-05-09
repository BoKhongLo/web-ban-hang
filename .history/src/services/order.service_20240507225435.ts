import { Types } from "mongoose";
import { createOderDto } from "../dtos/order";
import { CartModel, ICartItem, OrderModel } from "../models";
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
    cart.totalItemCount = 0;
    cart.totalPrice = 0;
    await cart.save();
    return {
      data: { ...newOrder.toJSON() },
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { data: { error: "Add failed" }, status: 500 };

  }
}

export async function getOrderByIdService(userId: string, orderId: string){
  try {

      let roomUser = await roomchatModel.findOne({
          id: roomId
      });
      if (!roomUser) {
          return { data : {error: "This room is exist!"}, status: 401 };
      }
      return { data : roomUser.toJSON(), status: 201 }
  } catch (error) {
      console.error(error);
      return { data : { error: "Get room failed" }, status: 500 };
  }
}

export async function getRoomchatUserService(userId: string){
  try {
      let orderList = await OrderModel.find({
          userId: userId
      });
      if (!orderList) {
          return { data : {error: "This order is exist!"}, status: 401 };
      }
      let dataReturn = [];
      orderList.map((value, index) => {
        dataReturn.push(value.toJSON())
      })
      return { data : dataReturn, status: 201 }
  } catch (error) {
      console.error(error);
      return { data : { error: "Get order failed" }, status: 500 };
  }
}