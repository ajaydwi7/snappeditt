const mongoose = require("mongoose");

//Retouching Type schema
const retouchingTypeSchema = new mongoose.Schema({
  name: { type: String, required: false }, // Retouching type name (e.g., Interior, Exterior)
  description: { type: String }, // Optional description for the retouching type
});

// Define the schema for features
const featureSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Feature name
  included: { type: Boolean, default: true }, // Whether the feature is included
});

// Define the schema for images (before/after)
const imageSchema = new mongoose.Schema({
  before: { type: String, required: true }, // URL for the before image
  after: { type: String, required: true }, // URL for the after image
});

// Define the schema for form fields
const formFieldSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Field name
  type: { type: String, required: true }, // Field type (e.g., text, file, textarea)
  placeholder: { type: String }, // Placeholder text
  required: { type: Boolean, default: false }, // Whether the field is required
});

// Define the schema for services
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the service
  slug: { type: String, unique: true, required: true }, // Unique identifier for the service
  description: { type: String, required: true }, // Service description
  price: { type: Number, required: true },
  featureImage: { type: String, required: true }, // Price of the service
  features: [featureSchema], // Array of features
  images: [imageSchema], // Array of images (before/after)
  formFields: [formFieldSchema], // Array of form fields for orders
  retouchingTypes: [retouchingTypeSchema],
});

// Define the schema for subcategories
const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the subcategory
  slug: { type: String, unique: true, required: true }, // Unique identifier for the subcategory
  description: String, // Description of the subcategory
  services: [serviceSchema], // Array of services under this subcategory
});

// Define the main category schema
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the category
    slug: { type: String, unique: true, required: true }, // Unique identifier for the category
    description: String, // Description of the category
    subCategories: [subCategorySchema], // Array of subcategories under this category
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
