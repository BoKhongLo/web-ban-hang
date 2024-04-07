import mongoose, { Schema, Types, Model, Document } from "mongoose";

interface IMessages extends Document  {
  id: string;
  email: string;
  otpCode: string;
  type: string;
  value: boolean;
  isDisplay: boolean;
  updateAt: Date,
  createdAt: Date
}

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
        userId: {
          type: String,
        },
        isDisplay: {
          type: Boolean,
        },
        content: {
          type: String,
        },
        urlFile: {
          type: [String],
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