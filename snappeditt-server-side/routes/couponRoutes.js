const express = require("express");
const router = express.Router();
const {
  validateCoupon,
  createCoupon,
  getAllCoupons,
} = require("../Controller/couponController");
const { protect, admin } = require("../middleware/checkAuth");

// Public routes
router.post("/validate", validateCoupon);

// // Admin routes
// router.post("/", protect, admin, createCoupon);
// router.get("/", protect, admin, getAllCoupons);

module.exports = router;
