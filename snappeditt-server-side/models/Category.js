const mongoose = require("mongoose");

// Variation Option schema
const variationOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  priceAdjustment: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
});

// Variation Type schema
const variationTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  options: [variationOptionSchema],
  required: {
    type: Boolean,
    default: false,
  },
});

// Price Combination schema
const priceCombinationSchema = new mongoose.Schema({
  combination: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "variationOption",
    },
  ],
  price: {
    type: Number,
    required: true,
  },
});

// Feature schema
const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  included: {
    type: Boolean,
    default: true,
  },
});

// Image schema
const imageSchema = new mongoose.Schema({
  before: {
    type: String,
    required: true,
  },
  after: {
    type: String,
    required: true,
  },
});

// Service schema
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  featureImage: {
    type: String,
    required: true,
  },
  features: [featureSchema],
  images: [imageSchema],
  variationTypes: [variationTypeSchema],
  priceCombinations: [priceCombinationSchema],
});

// Subcategory schema
const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  services: [serviceSchema],
});

// Main Category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    subCategories: [subCategorySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
