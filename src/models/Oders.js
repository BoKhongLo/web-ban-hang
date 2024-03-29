import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
    "Oders",
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
    })
);