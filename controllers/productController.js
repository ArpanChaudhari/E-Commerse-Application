const Product = require("../model/product_Model");
const fs = require("fs");
const path = require("path");



// Get All Products
const getProducts = async (req, res, next) => {
    try {
        const { search, category } = req.query;
        let query = {};

        if (category && category !== "All") {
            query.category = category;
        }

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        next(err);
    }
};

// Get Single Products
const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Not found" });

        res.json(product);
    } catch (err) {
        next(err);
    }
};


// Add Product
const addProduct = async (req, res, next) => {
    try {
        const { name, category, price, Quantity } = req.body;

        const image = req.file
            ? `/Images/${category}/${req.file.filename}`
            : "/Images/default.png";

        const lastProduct = await Product.findOne({ productId: { $exists: true } })
            .sort({ productId: -1 });

        const nextId = lastProduct && lastProduct.productId
            ? lastProduct.productId + 1
            : 1;

        const product = await Product.create({
            productId: nextId,
            name,
            category,
            price,
            Quantity,
            image
        });

        res.status(201).json(product);

    } catch (err) {
        next(err);
    }
};

// Update Product
const updateProduct = async (req, res, next) => {
    try {
        const { name, category, price, Quantity } = req.body;

        const updateData = { name, category, price, Quantity };

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (req.file) {
            updateData.image = `/Images/${category}/${req.file.filename}`;
            // Delete old image if it's not the default one
            if (product.image && product.image !== "/Images/default.png") {
                const oldImagePath = path.join(__dirname, "../public", product.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }   
        );

        res.json(updated);

    } catch (err) {
        next(err);
    }
};

// Delete Product
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete the associated image file
        if (product.image && product.image !== "/Images/default.png") {
            const imagePath = path.join(__dirname, "../public", product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}