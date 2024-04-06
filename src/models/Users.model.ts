import mongoose, { Schema, Model, Types } from "mongoose";
import { CartModel, ICart } from "./Cart.model";
import passportLocalMongoose from "passport-local-mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

interface IDeliveryInfo {
  name: string;
  phoneNumber: string;
  address: string;
}

export interface AuthToken {
    accessToken: string;
    kind: string;
}

const DeliveryInfo = new Schema<IDeliveryInfo>({
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
});

interface IUser {
  id: string;

  isDisplay: boolean;

  username: string;

  firstName?: string;

  lastName?: string;

  hash: string;

  refresh_token: string;

  email: string;

  phoneNumber?: Types.Array<string>;

  address: string;

  gender: string;

  role: string;

  deliveryInfoList?: Types.DocumentArray<IDeliveryInfo>;

  isAuthenticated: boolean;

  memberLevel: string;

  cart: Types.DocumentArray<ICart>;

  updateAt: Date;

  createdAt: Date;
}
DeliveryInfo.plugin(passportLocalMongoose)
const DeliveryInfoModel: Model<IDeliveryInfo> = mongoose.model<IDeliveryInfo>(
  "DeliveryInfo",
  DeliveryInfo
);

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  isDisplay: {
    type: Boolean,
    required: true,
  },
  username: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => value.length > 3,
      message: "username must be at least 3 characters",
    },
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  hash: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: [String],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "USER",
  },
  deliveryInfoList: {
    type: [
      {
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
    ],
    required: false,
  },
  isAuthenticated: {
    type: Boolean,
    required: false,
    default: false,
  },
  memberLevel: {
    type: String,
    required: false,
    default: "Bronze",
  },
  cart: {
    type: [
      {
        id: {
          type: String,
          required: true,
          unique: true,
        },
        userId: {
          type: String,
          required: true,
        },
        items: {
          type: [
            {
              productId: String,
              quantity: Number,
            },
          ],
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
        shippingAddress: {
          type: Schema.Types.ObjectId,
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
      },
    ],
    required: false,
  },
  updateAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
});
userSchema.plugin(passportLocalMongoose)
const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export { UserModel, IUser, IDeliveryInfo, DeliveryInfoModel };
