import mongoose, { Schema, Types, Model, Document } from "mongoose";

interface IMessages extends Document {
  id?: string;
  typeMegs: string;
  userId: string;
  roomId?: string;
  isDisplay?: boolean;
  title?: string;
  content: string;
  urlFile?: string[];
  star?: number;
  updateAt?: Date;
  createdAt?: Date;
}
const messagesSchema = new Schema<IMessages>({
  id: {
    type: String,
    required: false,
  },
  roomId: {
    type: String,
    required: false,
  },
  typeMegs: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  content: { type: String, required: true },
  urlFile: { type: [String] , required: false },
  star: { type: Number, required: false },
  updateAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },

});

const MessagesModel: Model<IMessages> = mongoose.model<IMessages>(
  "Messages",
  messagesSchema
);

interface ISales extends Document {
  isSales: boolean;
  percents: number;
  end: Date;
}

interface IProduct extends Document {
  id: string;

  productName: string;

  isDisplay: boolean;

  description?: string;

  cost: number;

  price: number;

  stockQuantity: number;

  imgDisplay: Types.Array<string>;

  productType: string;

  pattern: Types.Array<string>;

  buyCount?: number;

  rating?: number;

  commentsList: Types.DocumentArray<IMessages>;

  detail: string;

  sales?: ISales;

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
  cost: { type: Number, required: true },
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
    default: 0,
  },
  rating: {
    type: Number,
    require: false,
    default: 5,
  },
  detail: {
    type: String,
    required: true,
    tags: { type: [String], required: false },
    labels: { type: String, required: false, default: "Shiro" },
    materials: { type: [String], required: true },
  },
  sales: {
    type: {
      isSales: {
        type: Boolean,
        default: false,
      },
      percents: {
        type: Number,
        default: 0,
      },
      end: {
        type: Date,
        required: false,
      },
    },
    required: false,
    default: {
      isSales: false,
      percents: 0
    }
  },
  commentsList: {
    type: [
      {
        id: {
          type: String,
          required: false,
        },
        roomId: {
          type: String,
          required: false,
        },
        typeMegs: {
          type: String,
          required: true,
        },
        userId: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: false,
        },
        content: { type: String, required: true },
        urlFile: { type: [String] , required: false },
        star: { type: Number, required: false },
        updateAt: {
          type: Date,
          default: Date.now,
          required: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          required: false,
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
export { ProducModel, IProduct, IMessages, MessagesModel };