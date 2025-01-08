const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Cart
const CartSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  services: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
      serviceName: { type: String, required: true },
      serviceDescription: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      featureImage: { type: String },
      formData: { type: Object },
    },
  ],
  cartTotal: { type: Number, default: 0, required: true },
  cartQuantity: { type: Number, default: 0, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", CartSchema);
