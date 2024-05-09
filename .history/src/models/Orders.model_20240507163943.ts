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

interface IIsPay {
  isPaid: boolean;
  updateAt: Date;
  createdAt: Date;
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
  paymentMethods: string;
  isPay:IIsPay;
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
  isPay: {
    type: {
      isPaid: {
        type: Boolean,
        required: false,
        default: false
      },
      updateAt: {
        type: Date,
        default: Date.now,
        required: false, 
      },
      createdAt: {
        type: Date,
        default: Date.now,
        required: false, 
      },
    },
    required: false
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Processing", "In transit", "Delivered", "Cancelled"],
    default: "Processing",
    required: false,
  },
  updateAt: {
    type: Date,
    default: Date.now,
    required: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false, 
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
        required: false,
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
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
    },
    required: true
  },
  paymentMethods: {
    type: String,
    required: true
  }
});

const OrderModel : Model<IOrder> = mongoose.model<IOrder>("Order",orderSchema)
export {IOrder, OrderModel, IPersonalInfo, IDeliveryInfo}