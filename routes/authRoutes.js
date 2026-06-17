const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const { signupValidation, loginValidation } = require("../middleware/validator");

const {
    signup,
    login,
    getMe,
    logout
} = require("../controllers/authController");

// Routes
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/me", verifyToken, getMe);
router.post("/logout", logout);

module.exports = router;