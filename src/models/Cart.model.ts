import mongoose, { Schema, Types, Model, Document } from "mongoose";
import { IDeliveryInfo, DeliveryInfoModel } from "./Users.model";
import passportLocalMongoose from "passport-local-mongoose";

interface ICartItem extends Document {
  productId: string;
  quantity: string;
}

interface ICart extends Document {
  id: string;

  userId: string;

  items?: Types.DocumentArray<ICartItem>;

  totalPrice: string;

  shippingAddress?: Types.DocumentArray<IDeliveryInfo>;

  updateAt: Date;

  createdAt: Date;

  totalItemCount: string;
}

const cartSchema = new Schema<ICart>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: { type: String, required: true },
  items: {
    type: [
      {
        productId: String,
        quantity: Number,
      },
    ],
    required: false,
    default: [],
  },
  totalPrice: {
    type: String,
    required: false,
    default: "0",
  },
  totalItemCount: {
    type: String,
    required: false,
    default: "0",
  },
  shippingAddress: {
    type: [
      {
        name: {
          type: String,
          required: true,
          default: "",
        },
        phoneNumber: {
          type: String,
          required: true,
          default: "",
        },
        address: {
          type: String,
          required: true,
          default: "",
        },
      },
    ],
    required: false,
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
});
cartSchema.plugin(passportLocalMongoose);

const CartModel: Model<ICart> = mongoose.model<ICart>("Cart", cartSchema);
export { CartModel, ICart, ICartItem };
