import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true 
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true 
        },
        quantity: {
            type: Number,
            required: true, default: 1 
        }
    }],
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true 
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending' 
    },
    totalAmount: {
        type: Number,
        required: true 
    },
    address: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

const orderModel = mongoose.models.orders || mongoose.model("orders", OrderSchema);
export default orderModel;