const User = require("../model/user_Model");
const Orders = require("../model/order_Model");
const Product = require("../model/product_Model");

// Get Dashboard Statistics
const getDashboardStats = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Orders.countDocuments();
        
        // Calculate Total Revenue
        const allOrders = await Orders.find();
        const totalRevenue = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        // Get Recent Orders (last 5)
        const recentOrders = await Orders.find()
            .populate({ path: "userId", model: "User", foreignField: "userId", select: "name email" })
            .populate({ path: "items.productId", foreignField: "productId" })
            .sort({ createdAt: -1 })
            .limit(5);

        // Get Category Data (Count of products per category)
        const categoryData = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue,
            recentOrders,
            categoryData
        });
    } catch (err) {
        next(err);
    }
};

// Get All Users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        next(err);
    }
};

// Get All Orders (for Orders Tab)
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find()
            .populate({ path: "userId", model: "User", foreignField: "userId", select: "name email" })
            .populate({ path: "items.productId", foreignField: "productId" })
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

// Update Order Status
const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedOrder = await Orders.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order status updated", order: updatedOrder });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    getAllOrders,
    updateOrderStatus
};
