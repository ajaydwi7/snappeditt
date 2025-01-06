const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    topic: { type: String, required: true },
    message: { type: String, required: false },
    acceptTerms: { type: Boolean, required: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model("ContactForm", contactFormSchema);
