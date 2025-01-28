const express = require("express");
const serviceController = require("../Controller/serviceController");
const router = express.Router();

// Category Routes
router.get("/:categories", serviceController.getAllCategories);
router.get("/categories/:categorySlug", serviceController.getCategoryBySlug);
router.post("/categories", serviceController.addCategory); // New route for adding a category

// Subcategory Routes
router.post(
  "/categories/:categorySlug/subcategories",
  serviceController.addSubcategory
);
router.get(
  "/categories/:categorySlug/:subCategorySlug",
  serviceController.getSubcategoryBySlug
);

// Service Routes
router.post(
  "/categories/:categorySlug/:subCategorySlug/services",
  serviceController.addService
);
router.get(
  "/categories/:categorySlug/:subCategorySlug/:serviceSlug",
  serviceController.getServiceBySlug
);

// Define the route for getting all services
router.get("/get-services", serviceController.getAllServices);

router.get("/:categorySlug/:serviceSlug", serviceController.getServiceBySlug);

module.exports = router;
