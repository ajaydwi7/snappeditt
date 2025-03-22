const Category = require("../models/Category");
const serviceService = require("../services/serviceService");

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with this slug already exists" });
    }

    // Create a new category
    const newCategory = new Category({
      name,
      slug,
      description,
      subCategories: [], // Initialize with empty subcategories
    });

    // Save the category to the database
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding category", error: error.message });
  }
};

// Existing methods...
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await serviceService.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};

exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await serviceService.findBySlug(req.params.categorySlug);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching category", error: error.message });
  }
};

exports.addSubcategory = async (req, res) => {
  try {
    const updatedCategory = await serviceService.addSubcategory(
      req.params.categorySlug,
      req.body
    );
    res.status(201).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding subcategory", error: error.message });
  }
};

exports.getSubcategoryBySlug = async (req, res) => {
  try {
    const subcategory = await serviceService.findSubcategoryBySlug(
      req.params.categorySlug,
      req.params.subCategorySlug
    );
    if (!subcategory)
      return res.status(404).json({ message: "Subcategory not found" });
    res.status(200).json(subcategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching subcategory", error: error.message });
  }
};

exports.addService = async (req, res) => {
  try {
    const serviceData = req.body;

    // Validate price combinations when variations exist
    // if (serviceData.variationTypes?.length > 0) {
    //   if (
    //     !serviceData.priceCombinations ||
    //     serviceData.priceCombinations.length === 0
    //   ) {
    //     return res.status(400).json({
    //       message: "Price combinations required when variations exist",
    //     });
    //   }
    // }

    // Rest of the controller logic remains same
    const updatedSubcategory = await serviceService.addServiceToSubcategory(
      req.params.categorySlug,
      req.params.subCategorySlug,
      serviceData
    );

    res.status(201).json(updatedSubcategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding service", error: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories
    const services = [];

    categories.forEach((category) => {
      category.subCategories.forEach((subCategory) => {
        services.push(...subCategory.services); // Collect all services
      });
    });

    res.status(200).json(services); // Send all services as a response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching services", error: error.message });
  }
};

// Get service by slug
exports.getServiceBySlug = async (req, res) => {
  const { categorySlug, serviceSlug } = req.params;

  try {
    res.setHeader("Content-Type", "application/json");
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    let foundService = null;
    category.subCategories.forEach((subCategory) => {
      subCategory.services.forEach((service) => {
        if (service.slug === serviceSlug) {
          foundService = service;
        }
      });
    });

    if (!foundService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json(foundService);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Failed to fetch service" });
  }
};

// Update entire category
exports.updateCategory = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const updateData = req.body;

    const updatedCategory = await Category.findOneAndUpdate(
      { slug: categorySlug },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
};

// Update subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { categorySlug, subCategorySlug } = req.params;
    const updateData = req.body;

    const updatedCategory = await Category.findOneAndUpdate(
      {
        slug: categorySlug,
        "subCategories.slug": subCategorySlug,
      },
      {
        $set: {
          "subCategories.$.name": updateData.name,
          "subCategories.$.slug": updateData.slug,
          "subCategories.$.description": updateData.description,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating subcategory", error: error.message });
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    const { categorySlug, subCategorySlug, serviceSlug } = req.params;
    const updateData = req.body;

    const updatedCategory = await Category.findOneAndUpdate(
      {
        slug: categorySlug,
        "subCategories.slug": subCategorySlug,
        "subCategories.services.slug": serviceSlug,
      },
      {
        $set: {
          "subCategories.$[subCat].services.$[service]": updateData,
        },
      },
      {
        arrayFilters: [
          { "subCat.slug": subCategorySlug },
          { "service.slug": serviceSlug },
        ],
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating service", error: error.message });
  }
};

// Other service-related controllers...
