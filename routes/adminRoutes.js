const express = require("express");
const router = express.Router();
const { verifyToken, adminProtectPage } = require("../middleware/auth");
const { getDashboardStats, getAllUsers, getAllOrders, updateOrderStatus } = require("../controllers/adminController");

// Use both middlewares to ensure user is logged in AND is an admin
router.use(verifyToken, adminProtectPage);

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);

module.exports = router;
