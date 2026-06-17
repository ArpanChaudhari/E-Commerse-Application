const express = require("express");
const router = express.Router();

const {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const { verifyToken, isAdmin } = require("../middleware/auth");
const { productValidation } = require("../middleware/validator");
const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const category = req.body.category || "default";
        const uploadPath = path.join(__dirname, "../public/Images", category);
        require("fs").mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Routes
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", verifyToken, isAdmin, upload.single("image"), productValidation, addProduct);
router.put("/:id", verifyToken, isAdmin, upload.single("image"), productValidation, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;