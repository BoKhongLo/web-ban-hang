import mongoose, { Schema } from "mongoose";
export default mongoose.model(
  "Label",
  new Schema({
    list: {
      type: [String],
      required: true,
    },
  })
);
