import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategories"
    },
    images: {
        type: Array,
        required: true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    permission: {
        type: Boolean,
        default: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const productModel = mongoose.models.products || mongoose.model("products", productSchema);
export default productModel;