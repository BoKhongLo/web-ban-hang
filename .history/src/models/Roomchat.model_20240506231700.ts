import mongoose, { Schema, Types, Model, Document } from "mongoose";
import { IMessages } from "./Products.model";

interface IRoomchat extends Document {
  id: string;
  isDisplay: boolean;
  isBlock: boolean;
  userId: string;
  messages: Types.DocumentArray<IMessages>;
  updateAt: Date;
  createdAt: Date;
}

const roomchatSchema = new Schema<IRoomchat>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  isDisplay: {
    type: Boolean,
    required: true,
  },
  isBlock: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  messages: {
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
        content: { type: String, required: false, default: "" },
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
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
})

const roomchatModel: Model<IRoomchat> = mongoose.model<IRoomchat>(
  "Roomchat",
  roomchatSchema
);
export { roomchatModel, IRoomchat };