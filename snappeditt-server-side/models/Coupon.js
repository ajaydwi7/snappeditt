const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  maxUses: {
    type: Number,
    default: null,
  },
  timesUsed: {
    type: Number,
    default: 0,
  },
  minCartValue: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Coupon", CouponSchema);
