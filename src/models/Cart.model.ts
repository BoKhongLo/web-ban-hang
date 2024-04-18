import mongoose, { Schema, Types, Model, Document } from "mongoose";
import { IDeliveryInfo, DeliveryInfoModel } from './Users.model';
import passportLocalMongoose from "passport-local-mongoose";


interface ICartItem extends Document {
  productId: string;
  quantity: number;
}

interface ICart extends Document {
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
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true, 
  },
})
cartSchema.plugin(passportLocalMongoose)


const CartModel : Model<ICart> = mongoose.model<ICart>('Cart', cartSchema);

export { CartModel, ICart, ICartItem };