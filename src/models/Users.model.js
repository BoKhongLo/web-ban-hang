import mongoose, { Schema, ObjectId } from "mongoose";
import pkg from "validator";
import CartModel from "./Cart.model";

const { isEmail } = pkg;
export const DeliveryInfo = new Schema({
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
        id: { 
            type: String,
            required: true,
        },        
        isDisplay: {
            type: Boolean,
            required: true,
        },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message: "username must be at least 3 characters",
            },
        },
        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
        hash: {
            type: String,
            required: true,
        },
        refresh_token: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            validate: {
                validator: (value) => isEmail,
                message: "email is incorrect format",
            },
        },
        phoneNumber: {
            type: [Number],
            required: true,
        },
        address: {
            type: String,
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
        memberLevel: {
            type: String,
            required: false,
            default: "Bronze",
        },
        cart: {
            type: [CartModel],
            required: false,
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
    })
);