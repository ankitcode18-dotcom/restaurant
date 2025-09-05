const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: { type: Array, required: true },
    payment_mode: { // 0-> COD, 1-> for online
        type: String,
        required: true
    },
    totalAmount: { type: Number, required: true },
    branchId: { type: String, required: true },
    tableId: { type: Object, required: true },
    status: { type: String, default: "pending" },
},
    {
        timestamps: true
    });
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
