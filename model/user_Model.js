const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type : Number,
        required : true,
        unique : true
    },
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    addresses: [
        {
            label: String,
            addressLine1: String,
            addressLine2: String,
            isDefault: { type: Boolean, default: false }
        }
    ],
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);