import mongoose, { Schema, Types, Model, Document } from "mongoose";
import { IMessages } from "./Products.model";

interface IRoomchat extends Document {
  id: string;
  isDisplay: boolean;
  isBlock: boolean;
  memberRoomchat: Types.Array<string>;
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
  memberRoomchat: {
    type: [String],
    required: true,
  },
  messages: {
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