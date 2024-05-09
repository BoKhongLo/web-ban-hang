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
  content: { 
    type: String, 
    required: true 
  },
  urlFile: { 
    type: [String], 
    required: false 
  },
  star: { 
    type: Number, 
    required: false 
  },
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

interface IImage {
  url: string;
  link?: string[];
}

interface ISales {
  isSales: boolean;
  percents: number;
  end: Date;
}

interface IDetail {
  tags: Types.Array<string>;
  company: string;
  materials: Types.Array<string>;
}

interface IProduct extends Document {
  id: string;

  productName: string;

  isDisplay: boolean;
  
  cost: number;

  price: number;

  stockQuantity: number;

  imgDisplay: Types.DocumentArray<IImage>;

  productType: string;

  color: Types.Array<string>;

  size: Types.Array<string>;

  buyCount?: number;

  rating?: number;

  commentsList?: Types.DocumentArray<IMessages>;

  detail?: IDetail;

  sales?: ISales;

  description?: string;

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
  },
  isDisplay: {
    type: Boolean,
    required: true,
    default: true,
  },
  cost: {
    type:
      Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true
  },
  productType: {
    type: String,
    main: String,
    sub: String,
    required: true,
  },

  color: {
    type: [String],
    required: false,
    default: ["All"]
  },
  size: {
    type: [String],
    required: false,
    default: ["All"]
  },
  imgDisplay: {
    type: [{
      url: {
        type: String,
        required: true,
      },
      link: {
        type: [String],
        required: false,
        default: []
      }
    }],
    required: false,
    default: [],
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
    type: {
      tags: { type: [String], required: false, default: ["All"] },
      company: { type: String, required: false, default: "Unknown" },
      materials: { type: [String], required: true, default: [] },
    },
    required: false,
    _id: false,
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
    },
    _id: false,
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
        urlFile: { type: [String], required: false },
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
    required: false,
  },
  description: { 
    type: String, 
    required: false, 
    default: "" 
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
const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);
export { ProductModel, IProduct, IMessages, MessagesModel, IDetail, IImage };