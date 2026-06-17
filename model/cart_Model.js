const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type : Number,
        unique : true,
        required: true
    },
    items: [
        {
            productId: {
                type: Number,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            },
            status: {
                type: String,
                enum: ['active', 'inactive', 'purchased'],
                default: 'active'
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);