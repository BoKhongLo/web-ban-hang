import mongoose, { Schema, Model, Types, Document} from "mongoose";

interface IDeliveryInfo extends Document{
  name: string;
  phoneNumber: string;
  address: string;
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

const DeliveryInfoModel: Model<IDeliveryInfo> = mongoose.model<IDeliveryInfo>(
  "DeliveryInfo",
  DeliveryInfo
);

interface IUser extends Document {
  id: string;

  isDisplay: boolean;

  username: string;

  firstName?: string;

  lastName?: string;

  hash: string;

  refresh_token: string;

  email: string;

  phoneNumber?: string;

  imgDisplay?: string;

  birthday?: Date;

  address?: string;

  gender?: string;

  role?: Types.Array<string>;

  memberExp: number;

  memberLevel: string;

  cartId: string;

  roomId: string;
  roomId: string;

  updateAt: Date;

  createdAt: Date;

  idCart : String;
}

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  isDisplay: {
    type: Boolean,
    required: false,
    default: true,
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
    default: "",
  },
  lastName: {
    type: String,
    required: false,
    default: "",
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
    type: String,
    required: false,
    default: "",
  },
  imgDisplay: {
    type: String,
    required: false,
    default: "http://localhost:3434/media/file/user.png",
  },
  birthday: {
    type: Date,
    required: false,
    default: Date.now()
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  gender: {
    type: String,
    required: false,
    default: "OTHER",
  },
  role: {
    type: [String],
    required: true,
    default: ["USER"],
  },
  memberExp: {
    type: Number,
    required: false,
    default: 0,
  },
  memberLevel: {
    type: String,
    required: false,
    default: "Bronze",
  },
  cartId: {
    type: String,
    required: false,
  },
  roomId: {
    type: String,
    required: false,
  },
  updateAt: {
    type: Date,
    required: true, 
    default: Date.now,
  },
  createdAt: {
    type: Date,
    required: true, 
    default: Date.now,
  },
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export { UserModel, IUser, IDeliveryInfo, DeliveryInfoModel };