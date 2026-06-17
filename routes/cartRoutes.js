const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");

const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart,
    createRazorpayOrder,
    verifyPayment
} = require("../controllers/cartController");

// Routes
router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.put("/update", verifyToken, updateCart);
router.delete("/remove/:id", verifyToken, removeFromCart);
router.delete("/clear", verifyToken, clearCart);
router.post("/create-razorpay-order", verifyToken, createRazorpayOrder);
router.post("/verify-payment", verifyToken, verifyPayment);

module.exports = router;