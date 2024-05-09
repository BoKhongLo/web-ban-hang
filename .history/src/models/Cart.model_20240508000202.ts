import mongoose, { Schema, Types, Model, Document } from "mongoose";


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

  items?: Types.DocumentArray<ICartItem>;

  totalPrice: number;

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

  items: {
    type: [{
      productId: String,
      quantity: Number,
      color: String,
      size: String,
      price: Number,
    }],
    _id: false,
  }, 
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

const CartModel: Model<ICart> = mongoose.model<ICart>("Cart", cartSchema);

export { CartModel, ICart, ICartItem };
