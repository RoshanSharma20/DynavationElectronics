const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref: 'productModel'
    }],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'userModel'
    },
    status: {
        type: String,
        default: 'Not Process',
        enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"]
    }
}, { timestamps: true });
const OrderModel = mongoose.model('orderModel', orderSchema);
module.exports = OrderModel;