const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceOrderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  services: [
    {
      serviceId: { type: String, required: true },
      serviceName: { type: String, required: true },
      serviceDescription: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      featureImage: { type: String },
      formData: { type: Object },
    },
  ],
  deliveryType: { type: String, required: true },
  totalCost: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, default: "Pending" },
  paypalOrderId: { type: String, required: true, unique: true },
  billingDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
  },
  order_cancelled: { type: Boolean, default: false },
  percentage_complete: { type: Number, default: 0 },
  expected_delivery_date: {
    type: Date,
    default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
  }, // 7 days from now
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ServiceOrder", ServiceOrderSchema);
