import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
    "Products",
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (value) => {
                    // Define the validator function
                    return typeof value === "string" && value.trim().length > 0;
                },
                message: "product's name must be at least 3 characters",
            },
        },
        description: {
            type: String,
            required: false,
            default: "Một sản phẩm từ....",
        },
        price: { type: Number, required: true },
        stockQuantity: { type: Number, required: true }, // lượng hàng còn lại trong kho
        img: { type: Array, required: true },
        size: {
            type: [String],
            required: true,
        },
        productType: {
            main: String,
            sub: String,
        },
        pattern: {
            type: [String],
            required: false,
        },
        tags: {
            type: [String],
            required: false,
        },
        dateAdded: {
            type: Date,
            required: false,
            default: Date.now,
        },
        isSale: {
            status: {
                type: Boolean,
                default: false,
            },
            percent: {
                type: Number,
                default: 0,
            },
            end: {
                type: Date,
            },
        },
        ofSellers: {
            userId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "User",
            },
            name: String,
        },
        labels: {
            type: String,
            required: false,
            default: "Shiro",
        },
        materials: {
            type: [String],
            required: true,
        },
        buyCounts: {
            type: Number,
            required: false,
            default: 0,
        },
        viewCounts: {
            type: Number,
            required: false,
            default: 0,
        },
        rating: {
            byUser: String,
            content: String,
            star: Number,
        },
        index: {
            type: Number,
            required: false,
            default: 0,
        },
        comment: {
            total: {
                type: Number,
                require: false,
                default: 0,
            },
            items: [
                {
                    title: {
                        type: String,
                    },
                    content: {
                        type: String,
                    },
                    name: {
                        type: String,
                    },
                    date: {
                        type: Date,
                        default: Date.now,
                    },
                    star: {
                        type: Number,
                    },
                },
            ],
        },
    })
);
