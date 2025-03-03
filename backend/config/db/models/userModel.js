import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'vendor', 'admin'],
        default: 'customer',
    },
    houseName: {
        type: String
    },
    postalArea: {
        type: String,
    },
    pinCode: {
        type: Number,
    },
    phone: {
        type: Number
    },
    cartList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }],
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    }],
    brand: {
        type: String,
    },
    profit: {
        type: Number,
        default: 0
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

const userModel = mongoose.models.users || mongoose.model("users", userSchema);
export default userModel;