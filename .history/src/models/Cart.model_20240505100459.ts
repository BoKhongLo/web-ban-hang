import mongoose, { Schema, Types, Model, Document } from "mongoose";
import { IDeliveryInfo, DeliveryInfoModel } from "./Users.model";
import passportLocalMongoose from "passport-local-mongoose";

interface ICartItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}
interface ICart extends Document {
  id: string;

  userId: string;

  // items?: Types.DocumentArray<ICartItem>;
  items?: ICartItem[];

  totalPrice: number;

  shippingAddress?: Types.DocumentArray<IDeliveryInfo>;

  updateAt: Date;

  createdAt: Date;

  totalItemCount: number;
}

const cartSchema = new Schema<ICart>({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  userId: { type: String, required: true },

  items: [{
    productId: String,
    quantity: Number
    
  }],

  totalPrice: {
    type: Number,
    required: false,
    default: 0,
  },

  totalItemCount: {
    type: Number,
    required: false,
    default: 0,
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
