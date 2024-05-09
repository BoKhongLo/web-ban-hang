import mongoose, { Schema, Types, Date, Model, Document } from "mongoose";
import { ProductModel, IProduct } from "./Products.model";
import { IDeliveryInfo } from "./Users.model";

interface IOrder extends Document {
  id: string;
  userId: string;
  isDisplay: boolean;
  totalAmount: number;
  status: string;
  items?: ICartItem[];
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
    type: [
      {
        id: {
          type: String,
          required: true,
          unique: true,
        },
        productName: {
          type: String,
          required: true,
          validate: {
            validator: (value: string) => value.length > 3,
            message: "username must be at least 3 characters",
          },
        },
        isDisplay: {
          type: Boolean,
          required: true,
        },
        description: {
          type: String,
          required: false,
          default: "Một sản phẩm từ....",
        },
        price: { type: Number, required: true },
        stockQuantity: { type: Number, required: true },
        productType: {
          type: String,
          main: String,
          sub: String,
          required: true,
        },
        pattern: {
          type: [String],
          required: false,
        },
        buyCount: {
          type: Number,
          require: false,
        },
        rating: {
          type: Number,
          require: false,
        },
        detail: {
          type: String,
          required: true,
          tags: { type: [String], required: false },
          labels: { type: String, required: false, default: "Shiro" },
          materials: { type: [String], required: true },
        },
        isSale: {
          type: Boolean,
          default: false,
          percent: {
            type: Number,
            default: 0,
          },
          end: {
            type: Date,
          },
        },
        commentsList: {
          type: [
            {
              id: {
                type: String,
                required: true,
              },
              userID: {
                type: String,
                required: true,
              },
              title: {
                type: String,
                required: true,
              },
              content: { type: String, required: true },
              urlFile: { type: [{ imageUrl: [String] }], required: true },
              star: { type: Number, required: true },
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
            },
          ],
        },
      },
    ],
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