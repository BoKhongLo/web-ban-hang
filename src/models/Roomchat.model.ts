import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
  "Roomchat",
  new Schema({
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
          Update_At: {
            type: Date,
            default: Date.now,
          },
          Created_At: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      required: true,
    },
    Created_At: {
      type: Date,
      required: false,
      default: Date.now,
    },
    Update_At: {
      type: Date,
      required: false,
      default: Date.now,
    },
  })
);