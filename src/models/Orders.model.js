import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
    "Orders",
    new Schema({
        id : {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            ref: "Person",
            required: true,
        },
        isDisplay: {
            type: Boolean,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Handling", "On Express", "Canceled"],
            default: "Handling",
            required: true,
        },
        listProducts: {
            type: Array,
            required: true,
        },
        note: {
            type: String,
        },
        deliveryInfo: {
            type: String,
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
