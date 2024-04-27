import mongoose, { Schema, Document, Model } from "mongoose";

interface IOtp extends Document {
    id: string;
    email: string;
    otpCode: string;
    type: string;
    value: boolean;
    isDisplay: boolean;
    updateAt: Date,
    createdAt: Date
}

const otpSchema = new Schema<IOtp>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true, 
    },
    otpCode: {
        type: String,
        required: true, 
    },
    type: {
        type: String,
        required: true, 
    },
    value: {
        type: Boolean,
        required: true,
    },
    isDisplay: {
        type: Boolean,
        required: true,
    },
    updateAt: {
        type: Date,
        default: Date.now,
        required: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true, 
    },
});
const OtpModel: Model<IOtp> = mongoose.model<IOtp>(
    "Otp",
    otpSchema
);
export { OtpModel, IOtp };