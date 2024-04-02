import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
    "Orders",
    new Schema({
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person",
            required: true,
        },
        orderDate: {
            type: Date,
            default: Date.now,
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
        Created_At: {
            type: Date,
            required: false,
            default: Date.now,
        },
        cart: { type: Object, required: true },
        deliveryInfo: {
            type: String,
            required: true,
        },
        Update_At: {
            type: Date,
            required: false,
            default: Date.now,
        },
    })
);
