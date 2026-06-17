const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type : Number,
        required: true
    },
    items: [
        {
            productId: {
                type: Number,
                ref: "Product"
            },
            quantity: Number
        }
    ],
    totalAmount: Number,
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model("Order",orderSchema);