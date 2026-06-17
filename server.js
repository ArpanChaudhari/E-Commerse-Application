require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/usersRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { protectPage, adminProtectPage } = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");


// ================= APP CONFIG =================
const app = express();
const PORT = process.env.PORT || 8000;

// DB
connectDB();

// ================= MIDDLEWARE =================
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://127.0.0.1:5500",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public", { index: false }));

// ================= ROUTES =================
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/index.html", protectPage, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/cart.html", protectPage, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "cart.html"));
});

app.get("/profile.html", protectPage, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "profile.html"));
});

app.get("/form.html", adminProtectPage, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "form.html"));
});

app.get("/admin.html", adminProtectPage, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// ================= GLOBAL ERROR HANDLER =================
app.use(errorHandler);

// ================= SERVER =================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});