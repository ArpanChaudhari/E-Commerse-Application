const Cart = require("../model/cart_Model");
const Order = require("../model/order_Model");
const Razorpay = require('razorpay');
const crypto = require('crypto');

let razorpay;
try {
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
    } else {
        console.log("Razorpay Warning: Keys missing");
    }
} catch (error) {
    console.log("Razorpay Error:", error.message);
}

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;

        let cart = await Cart.findOne({ userId: req.user.userId });  // load cart item

        if (!cart) {
            cart = await Cart.create({  // if nothing then create i cart  
                userId: req.user.userId,
                items: []
            });
        }

        // Find if product is already in cart as 'active' or 'inactive'
        // We ignore 'purchased' items so they stay in history permanently.
        const item = cart.items.find(    
            i => i.productId.toString() === productId.toString() && 
                 (i.status === 'active' || i.status === 'inactive')
        );

        if (item) {   // if yes then update quantity
            if (item.status === 'inactive') {
                item.status = 'active';
                item.quantity = 1;
            } else {
                item.quantity += 1;
            }
        } else {
            cart.items.push({ productId, quantity: 1, status: 'active' });  //else push new items in cart
        }

        await cart.save(); 

        res.json({ message: "Added to cart" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding to cart" });
    }
};


// ================= GET CART =================
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId })
            .populate({ path: "items.productId", foreignField: "productId" });

        if (cart) {
            cart.items = cart.items.filter(item => item.status === 'active');
        }

        res.json(cart || { items: [] }); // If cart exists -> send cart    If not -> send empty cart:

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching cart" });
    }
};


// ================= UPDATE ITEM =================
const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            i => i.productId.toString() === productId.toString() && i.status === 'active'
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        item.quantity = quantity;

        await cart.save();

        res.json({ message: "Cart updated" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating cart" });
    }
};


// ================= REMOVE ITEM =================
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            item => item.productId.toString() === req.params.id && item.status === 'active'
        );

        if (item) {
            item.status = 'inactive';
        }

        await cart.save();

        res.json({ message: "Item removed" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error removing item" });
    }
};

// =============== Clear Cart ============
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId });
        if (cart) {
            cart.items.forEach(item => {
                if (item.status === 'active') {
                    item.status = 'inactive';
                }
            });
            await cart.save();
        }

        res.json({ message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ message: "Error clearing cart" });
    }
};

//==================== Create Razorpay Order =================
const createRazorpayOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId })
            .populate({ path: "items.productId", foreignField: "productId" });

        if (!cart) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const activeItems = cart.items.filter(item => item.status === 'active');

        if (activeItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Check inventory first
        for (const item of activeItems) {
            if (item.productId.Quantity < item.quantity) {
                return res.status(400).json({ 
                    message: `Insufficient stock for ${item.productId.name}. Only ${item.productId.Quantity} left.` 
                });
            }
        }

        // calculate total
        let total = 0;
        activeItems.forEach(item => {
            total += item.productId.price * item.quantity;
        });

        const options = {
            amount: Math.round(total * 100), // Razorpay expects strict integer paise for INR
            currency: "INR",
            receipt: `receipt_order_${req.user.userId}_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        
        res.json({ 
            order_id: order.id, 
            amount: options.amount, 
            currency: options.currency,
            key_id: process.env.RAZORPAY_KEY_ID // Send public key to frontend
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating Razorpay order" });
    }
};

//==================== Verify Payment =================
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        // Signature valid, process order
        const cart = await Cart.findOne({ userId: req.user.userId })
            .populate({ path: "items.productId", foreignField: "productId" });

        if (cart) {
            const activeItems = cart.items.filter(item => item.status === 'active');
            let total = 0;
            activeItems.forEach(item => { total += item.productId.price * item.quantity; });
            const orderItems = activeItems.map(item => ({
                productId: item.productId.productId,
                quantity: item.quantity
            }));

            await Order.create({
                userId: req.user.userId,
                items: orderItems,
                totalAmount: total,
                status: 'processing'
            });

            for (const item of activeItems) {
                item.productId.Quantity -= item.quantity;
                await item.productId.save();
            }

            cart.items.forEach(item => {
                if (item.status === 'active') item.status = 'purchased';
            });
            await cart.save();
        }

        res.json({ message: "Payment verified successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error verifying payment" });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart,
    createRazorpayOrder,
    verifyPayment
};
