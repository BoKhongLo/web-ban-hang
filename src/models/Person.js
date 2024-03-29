import mongoose, { Schema, ObjectId } from "mongoose";
import pkg from 'validator';
const { isEmail } = pkg;export default mongoose.model(
    "Person",
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
        email: {
            type: String,
            validate: {
                validator: (value) => isEmail,
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