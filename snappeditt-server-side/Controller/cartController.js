const Cart = require("../models/Cart");
const Service = require("../models/Category");

// Add service to cart
exports.addToCart = async (req, res) => {
  const { userId, serviceId, quantity } = req.body;

  try {
    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        services: [],
        cartTotal: 0,
        cartQuantity: 0,
      });
    }

    // Check if service already exists in cart
    const existingServiceIndex = cart.services.findIndex(
      (item) => item.serviceId.toString() === serviceId
    );

    if (existingServiceIndex >= 0) {
      // Update quantity and total price if service exists
      cart.services[existingServiceIndex].quantity += quantity;
      cart.services[existingServiceIndex].totalPrice =
        cart.services[existingServiceIndex].quantity * service.price;
    } else {
      // Add new service to cart
      cart.services.push({
        serviceId,
        serviceName: service.name,
        serviceDescription: service.description,
        price: service.price,
        quantity,
        totalPrice: quantity * service.price,
        featureImage: service.featureImage,
        formData: {},
      });
    }

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
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// Fetch user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      "services.serviceId"
    );
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Ensure cart data is up-to-date with service data
    const updatedCart = cart.services.map((item) => {
      if (item.serviceId) {
        return {
          ...item._doc,
          price: item.serviceId.price,
          serviceName: item.serviceId.name,
          serviceDescription: item.serviceId.description,
          totalPrice: item.quantity * item.serviceId.price,
        };
      }
      return item;
    });

    cart.services = updatedCart;
    cart.cartTotal = updatedCart.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    cart.cartQuantity = updatedCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
