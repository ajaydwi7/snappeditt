const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Category = require("../models/Category");

/// Add service to cart
exports.addToCart = async (req, res) => {
  const { userId, serviceId, quantity, formData } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!serviceId) {
    return res.status(400).json({ error: "Service ID is required" });
  }

  try {
    const trimmedServiceId = serviceId.trim();
    const category = await Category.findOne({
      "subCategories.services._id": trimmedServiceId,
    });

    if (!category) {
      return res.status(404).json({ error: "Service not found" });
    }

    let foundService = null;
    category.subCategories.forEach((subCategory) => {
      const service = subCategory.services.find(
        (srv) => srv._id.toString() === trimmedServiceId
      );
      if (service) foundService = service;
    });

    if (!foundService) {
      return res.status(404).json({ error: "Service not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        services: [],
        cartTotal: 0,
        cartQuantity: 0,
      });
    }

    const existingServiceIndex = cart.services.findIndex(
      (item) => item.serviceId.toString() === trimmedServiceId
    );

    if (existingServiceIndex >= 0) {
      cart.services[existingServiceIndex].quantity += quantity;

      if (cart.services[existingServiceIndex].quantity <= 0) {
        cart.services.splice(existingServiceIndex, 1);
      } else {
        cart.services[existingServiceIndex].totalPrice =
          cart.services[existingServiceIndex].quantity * foundService.price;

        // Update formData if it exists
        cart.services[existingServiceIndex].formData = formData || {};
      }
    } else if (quantity > 0) {
      cart.services.push({
        serviceId: trimmedServiceId,
        serviceName: foundService.name,
        serviceSlug: foundService.slug,
        categorySlug: category.slug,
        serviceDescription: foundService.description,
        price: foundService.price,
        quantity,
        totalPrice: quantity * foundService.price,
        featureImage: foundService.featureImage,
        formData: formData || {}, // Add formData here
      });
    }

    cart.cartTotal = cart.services.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    cart.cartQuantity = cart.services.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add service to cart" });
  }
};

// Fetch user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      return res
        .status(200)
        .json({ services: [], cartTotal: 0, cartQuantity: 0 }); // Return empty cart
    }

    const updatedCart = cart.services.map((item) => ({
      ...item._doc,
    }));

    cart.services = updatedCart;

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// Remove service from cart
exports.removeFromCart = async (req, res) => {
  const { userId, serviceId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!serviceId) {
    return res.status(400).json({ error: "Service ID is required" });
  }

  try {
    // Convert userId and serviceId to ObjectId
    const objectIdUserId = new mongoose.Types.ObjectId(userId);
    const objectIdServiceId = new mongoose.Types.ObjectId(serviceId);

    const cart = await Cart.findOne({ user: objectIdUserId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the service in the cart
    const serviceIndex = cart.services.findIndex(
      (item) => item.serviceId.toString() === objectIdServiceId.toString()
    );

    if (serviceIndex === -1) {
      return res.status(404).json({ error: "Service not found in cart" });
    }

    // Remove the service
    cart.services.splice(serviceIndex, 1);

    // Update cart totals
    cart.cartTotal = cart.services.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    cart.cartQuantity = cart.services.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing service from cart:", error.message);
    res.status(500).json({ error: "Failed to remove service from cart" });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const cart = await Cart.findOneAndDelete({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
