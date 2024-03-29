import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
    "Products",
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true,
            validate: {
                validataor: (value) => value.length > 3,
                message: "product's name must be at least 3 characters",
            },
        },
        discripe: { type: String, required: true },
        price: { type: Number, required: true },
        stockQuantity: { type: Number, required: true },// lượng hàng còn lại trong kho
        img: { type: Array, required: true },
    })
);
