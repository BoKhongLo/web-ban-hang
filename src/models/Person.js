import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isemail";
export default mongoose.model(
    "Person",
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true,
            validate: {
                validataor: (value) => value.length > 3,
                message: "username must be at least 3 characters",
            },
        },
        email: {
            type: String,
            validate: {
                validataor: (value) => isEmail(value),
                message: "email is incorrect format",
            },
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Array,
            required: true,
        },
        address: {
            type: Array,
            required: true,
        },
        validateDay:{
            type: Date,
            required: true,
        },
        role:{
            type: String,
            required: true,
        }
    })
);