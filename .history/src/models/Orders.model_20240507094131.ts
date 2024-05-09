import mongoose, { Schema, Types, Date, Model, Document } from "mongoose";
import { ICartItem } from "./Cart.model";

interface IDeliveryInfo {
  city: string;
  district: string;
  address: string;
}

interface IPersonalInfo {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface IOrder extends Document {
  id: string;
  userId: string;
  isDisplay: boolean;
  totalAmount: number;
  status: string;
  listProducts: ICartItem[];
  notes: string;
  deliveryInfo: IDeliveryInfo;
  personalDetails: IPersonalInfo;
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
      city: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    required: true
  },
  personalDetails:{
    type:{
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
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