import mongoose, { Schema, Types, Model } from "mongoose";
import { IDeliveryInfo, DeliveryInfoModel } from './Users.model';
import passportLocalMongoose from "passport-local-mongoose";


interface ICartItem {
  productId: string;
  quantity: number;
}

interface ICart {
  id: string,

  userId: string,

  items: Types.DocumentArray<ICartItem>;

  totalPrice: number,

  shippingAddress?: IDeliveryInfo;

  updateAt: Date,

  createdAt: Date
}

const cartSchema = new Schema<ICart>({
  id: {
    type: String,
    required: true,
    unique:true,
  },
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: [
      {
        productId: String,
        quantity: Number
      }
    ],
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: {
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
    required: false,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
cartSchema.plugin(passportLocalMongoose)


const CartModel : Model<ICart> = mongoose.model<ICart>('Cart', cartSchema);
export { CartModel, ICart };