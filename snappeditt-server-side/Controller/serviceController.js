const Category = require("../models/Category");
const serviceService = require("../services/serviceService");

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
    const updatedSubcategory = await serviceService.addServiceToSubcategory(
      req.params.categorySlug,
      req.params.subCategorySlug,
      req.body
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

exports.getServiceBySlug = async (req, res) => {
  const { categorySlug, serviceSlug } = req.params;
  try {
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
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
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(foundService);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching service", error: error.message });
  }
};
