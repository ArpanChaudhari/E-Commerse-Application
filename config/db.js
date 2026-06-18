const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shopease");
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("Mongo Error:", err.message);
        // Removed process.exit(1) to prevent crash on Render
    }
};

module.exports = connectDB;