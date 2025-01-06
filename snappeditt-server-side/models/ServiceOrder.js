const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Service Order
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
      featureImage: { type: String, required: true },
      formData: { type: Object, required: true },
    },
  ],
  deliveryType: { type: String, required: true },
  deliveryCost: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, default: "Pending" },
  order_cancelled: { type: Boolean, default: false }, // New field for canceled orders
  percentage_complete: { type: Number, default: 0 },
  expected_delivery_date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ServiceOrder", ServiceOrderSchema);
