const User = require("../model/user_Model");
const Orders = require("../model/order_Model");
const bcrypt = require("bcryptjs");

const userProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({ userId: req.user.userId }).select("-password");

        const orders = await Orders.find({ userId: req.user.userId })
            .populate({ path: "items.productId", foreignField: "productId" })
            .sort({ createdAt: -1 });

        res.json({ user, orders });
    } catch (err) {
        next(err);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const { name, email, password, firstName, lastName, phone, bio } = req.body;

        const updateData = { name, email, firstName, lastName, phone, bio };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updated = await User.findOneAndUpdate(
            { userId: req.user.userId },
            updateData,
            { new: true }
        ).select("-password");

        res.json(updated);

    } catch (err) {
        next(err);
    }
}

const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Both current and new passwords are required" });
        }

        const user = await User.findOne({ userId: req.user.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        // Hash and save new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: "Password updated successfully" });

    } catch (err) {
        next(err);
    }
}

const addAddress = async (req, res, next) => {
    try {
        const { label, addressLine1, addressLine2, isDefault } = req.body;
        const user = await User.findOne({ userId: req.user.userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        const newAddress = { label, addressLine1, addressLine2, isDefault: isDefault || false };

        if (newAddress.isDefault || user.addresses.length === 0) {
            newAddress.isDefault = true;
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        user.addresses.push(newAddress);
        await user.save();
        res.status(201).json(user.addresses);
    } catch (err) { next(err); }
};

const updateAddress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { label, addressLine1, addressLine2, isDefault } = req.body;
        const user = await User.findOne({ userId: req.user.userId });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const addr = user.addresses.id(id);
        if (!addr) return res.status(404).json({ message: "Address not found" });

        if (isDefault) {
            user.addresses.forEach(a => a.isDefault = false);
        }

        if (label !== undefined) addr.label = label;
        if (addressLine1 !== undefined) addr.addressLine1 = addressLine1;
        if (addressLine2 !== undefined) addr.addressLine2 = addressLine2;
        if (isDefault !== undefined) addr.isDefault = isDefault;

        await user.save();
        res.json(user.addresses);
    } catch (err) { next(err); }
};

const deleteAddress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ userId: req.user.userId });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const addr = user.addresses.id(id);
        if (!addr) return res.status(404).json({ message: "Address not found" });

        user.addresses.pull(id);

        if (user.addresses.length > 0 && !user.addresses.some(a => a.isDefault)) {
            user.addresses[0].isDefault = true;
        }

        await user.save();
        res.json(user.addresses);
    } catch (err) { next(err); }
};

module.exports = {
    userProfile,
    updateProfile,
    changePassword,
    addAddress,
    updateAddress,
    deleteAddress
}