const Category = require("../models/Category");

class ServiceService {
  async findAll() {
    return await Category.find();
  }

  async findBySlug(slug) {
    return await Category.findOne({ slug });
  }

  async addSubcategory(categorySlug, subcategoryData) {
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) throw new Error("Category not found");
    category.subCategories.push(subcategoryData);
    return await category.save();
  }

  async findSubcategoryBySlug(categorySlug, subcategorySlug) {
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) throw new Error("Category not found");
    return category.subCategories.find((sub) => sub.slug === subcategorySlug);
  }

  async addServiceToSubcategory(categorySlug, subcategorySlug, serviceData) {
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) throw new Error("Category not found");

    const subcategory = category.subCategories.find(
      (sub) => sub.slug === subcategorySlug
    );
    if (!subcategory) throw new Error("Subcategory not found");

    subcategory.services.push(serviceData);
    return await category.save();
  }

  async findServiceBySlug(categorySlug, subcategorySlug, serviceSlug) {
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) throw new Error("Category not found");

    const subcategory = category.subCategories.find(
      (sub) => sub.slug === subcategorySlug
    );
    if (!subcategory) throw new Error("Subcategory not found");

    return subcategory.services.find((ser) => ser.slug === serviceSlug);
  }
}

module.exports = new ServiceService();
