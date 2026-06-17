require('dotenv').config();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const run = async () => {
    try {
        const options = {
            amount: Math.round(159.98 * 100),
            currency: "INR",
            receipt: `receipt_order_1_${Date.now()}`
        };
        console.log("Options:", options);
        const order = await razorpay.orders.create(options);
        console.log("Order created:", order.id);
    } catch (e) {
        console.error("Razorpay Error:", e);
    }
};

run();
