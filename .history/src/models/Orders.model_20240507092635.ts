import mongoose, { Schema, Types, Date, Model, Document } from "mongoose";
import { ProductModel, IProduct } from "./Products.model";
import { IDeliveryInfo } from "./Users.model";

interface IOrder extends Document {
  id: string;
  userId: string;
  isDisplay: boolean;
  totalAmount: number;
  status: string;
  listProducts: ICartItem[];
  notes: string;
  deliveryInfo: IDeliveryInfo;
  updateAt: Date;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    ref: "Person",
    required: true,
  },
  isDisplay: {
    type: Boolean,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Handling", "On Express", "Canceled"],
    default: "Handling",
    required: true,
  },
  updateAt: {
    type: Date,
    default: Date.now,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true, 
  },
  listProducts: {
    type: [{
      productId: String,
      quantity: Number,
      color: String,
      size: String,
      price: Number,
    }],
    required: false,
    default: []
  },
  deliveryInfo:{
    type:{
      name: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    required: true
  }
});

const OrderModel : Model<IOrder> = mongoose.model<IOrder>("Order",orderSchema)
export {IOrder, OrderModel}