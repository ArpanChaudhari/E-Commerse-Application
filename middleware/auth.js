const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../config/jwt");

// verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

// admin check
const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin only" });
    }
    next();
}

const protectPage = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect("/");
    }
}

const adminProtectPage = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (decoded.role !== "admin") {
            return res.redirect("/index.html");
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect("/");
    }
}

module.exports = { verifyToken, isAdmin, protectPage, adminProtectPage };