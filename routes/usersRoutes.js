const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const { updateProfileValidation } = require("../middleware/validator");

const {
    userProfile,
    updateProfile,
    changePassword,
    addAddress,
    updateAddress,
    deleteAddress
} = require("../controllers/userController")


router.get("/", verifyToken, userProfile);
router.put("/update", verifyToken, updateProfileValidation, updateProfile);
router.put("/change-password", verifyToken, changePassword);

router.post("/address", verifyToken, addAddress);
router.put("/address/:id", verifyToken, updateAddress);
router.delete("/address/:id", verifyToken, deleteAddress);

module.exports = router;