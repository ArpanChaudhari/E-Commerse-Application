const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    category: String,
    price: Number,
    Quantity: Number,
    image: String
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);