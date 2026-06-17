const User = require("../model/user_Model");
const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../config/jwt");
const bcrypt = require("bcryptjs");


// Sign-Up
const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check existing
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const lastUser = await User.findOne().sort({ userId: -1 });

        let nextId = 1;

        if (lastUser) {
            nextId = lastUser.userId + 1;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userId: nextId,
            name,
            email,
            password: hashedPassword,
            role: "user" // always user
        });

        await newUser.save();

        res.status(201).json({ message: "Signup successful" });

    } catch (err) {
        next(err);
    }
};
// LOGIN
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: user._id,        
                userId: user.userId,
                role: user.role
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        });

        res.json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        next(err);
    }
};

// Get Current User
const getMe = async (req, res, next) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findOne({ userId: req.user.userId })
                               .select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (err) {
        next(err);
    }
};

const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};

module.exports = {
    signup,
    login,
    getMe,
    logout
};