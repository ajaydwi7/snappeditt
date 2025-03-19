const mongoose = require("mongoose");

// Variation Option schema
/// Variation Option schema
const variationOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
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

// Price Combination schema (now using option names)
const priceCombinationSchema = new mongoose.Schema({
  combination: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  description: String,
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
  },
  after: {
    type: String,
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
  },
  basePrice: {
    type: Number,
    required: true,
  },
  priceRange: {
    min: Number,
    max: Number,
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

// Updated pre-save hook
serviceSchema.pre("save", function (next) {
  // Block any MongoDB IDs in price combinations
  // Block any MongoDB IDs in combinations
  this.priceCombinations.forEach((pc) => {
    if (pc.combination.some((name) => mongoose.Types.ObjectId.isValid(name))) {
      throw new Error(
        `Invalid combination format. Use option names, not IDs: ${pc.combination}`
      );
    }
  });

  // 1. Generate IDs for variation options
  this.variationTypes.forEach((vt) => {
    vt.options = vt.options.map((opt) => {
      if (!opt._id) opt._id = new mongoose.Types.ObjectId();
      return opt;
    });
  });

  // 2. Create name validation map
  const validOptionNames = new Set();
  this.variationTypes.forEach((vt) => {
    vt.options.forEach((opt) => {
      if (validOptionNames.has(opt.name)) {
        throw new Error(`Duplicate option name: ${opt.name}`);
      }
      validOptionNames.add(opt.name);
    });
  });

  // 3. Handle single variation type
  if (this.variationTypes.length === 1) {
    const singleVariation = this.variationTypes[0];
    singleVariation.options.forEach((opt) => {
      const exists = this.priceCombinations.some(
        (pc) => pc.combination.length === 1 && pc.combination[0] === opt.name
      );
      if (!exists) {
        this.priceCombinations.push({
          combination: [opt.name],
          price: this.basePrice,
        });
      }
    });
  }

  // 4. Validate combinations for multi-variation
  if (this.variationTypes.length > 1) {
    // Validate combination length
    this.priceCombinations.forEach((pc) => {
      if (pc.combination.length !== this.variationTypes.length) {
        throw new Error(
          `Combination ${pc.combination} requires ${this.variationTypes.length} options`
        );
      }
    });

    // Validate all options are covered
    const coveredOptions = new Set(
      this.priceCombinations.flatMap((pc) => pc.combination)
    );

    const missingOptions = Array.from(validOptionNames).filter(
      (name) => !coveredOptions.has(name)
    );

    if (missingOptions.length > 0) {
      throw new Error(`Missing combinations for: ${missingOptions.join(", ")}`);
    }
  }

  // 5. Validate all combination names exist
  this.priceCombinations.forEach((pc) => {
    pc.combination.forEach((name) => {
      if (!validOptionNames.has(name)) {
        throw new Error(`Invalid option name: ${name}`);
      }
    });
  });

  // Calculate price range
  const prices = this.priceCombinations
    .map((pc) => pc.price)
    .filter(Number.isFinite);
  this.priceRange =
    prices.length > 0
      ? {
          min: Math.min(...prices),
          max: Math.max(...prices),
        }
      : {
          min: this.basePrice,
          max: this.basePrice,
        };

  this.basePrice = this.priceRange.min;
  next();
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
