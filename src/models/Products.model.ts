import mongoose, { Schema, Types, Date, Model, Document } from "mongoose";

interface IMessages extends Document {
  id: string;
  typeMegs: string;
  userId: string;
  isDisplay: boolean;
  title: string;
  content: string;
  urlFile: string[];
  star: number;
  updateAt: Date;
  createdAt: Date;
}

interface IProduct extends Document {
  id: string;
  productName: string;
  isDisplay: boolean;
  description?: string;
  price: number;
  stockQuantity: number;
  imgDisplay: Types.Array<string>;
  productType: string;
  pattern: string[];
  buyCount?: number;
  rating?: number;
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
  imgDisplay: {
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
        star: { type: Number, required: true },
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