import mongoose, { Schema, Types, Date, Model, Document } from "mongoose";
import { ICartItem } from "./Cart.model";

interface IDeliveryInfo {
  city?: string;
  district?: string;
  address: string;
}

interface IPersonalInfo {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface IIsPay {
  isPaid?: boolean;
  bank?: string;
  trackId?: string;
  updateAt?: Date;
  createdAt?: Date;
}

interface IOrder extends Document {
  id: string;
  userId: string;
  isDisplay: boolean;
  totalAmount: number;
  status: string;
  listProducts: Types.DocumentArray<ICartItem>;
  notes?: string;
  deliveryInfo: IDeliveryInfo;
  deliveryType: string;
  personalDetails: IPersonalInfo;
  paymentMethods: string;
  isPay: IIsPay;
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
    required: true,
  },
  isDisplay: {
    type: Boolean,
    required: false,
    default: true,
  },
  isPay: {
    type: {
      isPaid: {
        type: Boolean,
        required: false,
        default: false,
      },
      bank:{
        type: String,
        required: false,
        default: "",
      },
      trackId: {
        type: String,
        required: false,
        default: "",
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
    required: false,
    default: {
      isPaid: false,
      bank: "",
      trackId: ""
    },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    default: "",
    required: false,
  },
  deliveryType: {
    type: String,
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
      productId: {
        type: String,
        required: false,
        index: true
      },
      quantity: {
        type: Number,
        required: false,
      },
      color: {
        type: String,
        required: false,
      },
      size: {
        type: String,
        required: false,
      },
      price:{
        type: Number,
        required: false,
      },
    }],
    required: false,
    default: [],
  },
  deliveryInfo:{
    type:{
      city: {
        type: String,
        required: false,
        default: ""
      },
      district: {
        type: String,
        required: false,
        default: ""
      },
      address: {
        type: String,
        required: true,
      },
    },
    required: true,
    _id: false,
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
    required: true,
    _id: false,
  },
  paymentMethods: {
    type: String,
    required: true
  }
});

const OrderModel : Model<IOrder> = mongoose.model<IOrder>("Order",orderSchema)
export {IOrder, OrderModel, IPersonalInfo, IDeliveryInfo}