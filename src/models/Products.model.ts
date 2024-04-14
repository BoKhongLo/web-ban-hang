import mongoose, { Schema, Types, Date, Model, Document } from "mongoose";

interface IMessages extends Document {
  id: string;
  typeMegs: string;
  userId: string;
  isDisplay: boolean;
  title: string;
  content: string;
  urlFile: string[];
  star: String;
  updateAt: Date;
  createdAt: Date;
}

interface IProduct extends Document {
  id: string;

  productName: string;

  isDisplay: boolean;

  description?: string;

  cost : String;

  price: String;

  stockQuantity: String;

  imgDisplay: Types.Array<string>;

  productType: string;

  pattern: string[];

  buyCount?: String;

  rating?: String;

  commentsList: Types.DocumentArray<IMessages>;

  detail: string;

  isSale: boolean;

  updateAt: Date,

  createdAt: Date
}

const productSchema = new Schema<IProduct>({
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
      message: "Tên người dùng phải có nhiều hơn 3 kí tự.",
    },
  },
  isDisplay: {
    type: Boolean,
    required: true,
    default: true,
  },
  description: {
    type: String,
    required: false,
    default: "Sản phẩm với chất liệu mềm mại, siêu thấm hút mồ hôi, ........",
  },
  cost: { type: String, required: true },
  price: { type: String, required: true },
  stockQuantity: { type: String, required: true },
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
  imgDisplay: {
    type: [String],
    required: false,
  },
  buyCount: {
    type: String,
    require: false,
  },
  rating: {
    type: String,
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
      type: String,
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
        typeMegs: {
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
        urlFile: { type: [String] , required: true },
        star: { type: String, required: true },
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
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const ProducModel: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);
export { ProducModel, IProduct, IMessages };