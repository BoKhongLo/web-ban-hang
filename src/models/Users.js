import mongoose, { Schema, ObjectId } from "mongoose";
import pkg from "validator";

const { isEmail } = pkg;
const DeliveryInfo = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

export default mongoose.model(
    "User",
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message: "username must be at least 3 characters",
            },
        },
        hash: {
            type: String,
            required: true,
        },
        access_token: {
            type: String,
            required: false,
        },
        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            validate: {
                validator: (value) => isEmail,
                message: "email is incorrect format",
            },
        },
        phone: {
            type: Array,
            required: true,
        },
        address: {
            type: Array,
            required: true,
        },
        validateDay: {
            type: Date,
            required: true,
        },
        admin: {
            type: Boolean,
            required: true,
            default: "USER",
        },
        deliveryInfoList: {
            type: [DeliveryInfo],
            required: false,
        },
        isAuthenticated: {
            type: Boolean,
            required: false,
            default: false,
        },
        Update_At: {
            type: Date,
            required: false,
            default: Date.now,
        },
        Created_At: {
            type: Date,
            required: false,
            default: Date.now,
        },
        memberLevel: {
            type: String,
            required: false,
            default: "Bronze",
        },
        cart: {
            type: Object,
            required: false,
        },
    })
);