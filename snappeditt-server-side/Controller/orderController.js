const mongoose = require("mongoose"); // Add this at the top
const ServiceOrder = require("../models/ServiceOrder");

// Confirm order
const confirmOrder = async (req, res) => {
  const {
    user_id,
    deliveryType,
    phoneNumber,
    items,
    totalCost,
    paypalOrderId,
    billingDetails,
  } = req.body;

  try {
    // Validate required fields
    const requiredFields = [
      user_id,
      deliveryType,
      phoneNumber,
      items,
      totalCost,
      paypalOrderId,
      billingDetails,
    ];

    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate items structure
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid items format" });
    }

    // Validate each item
    for (const item of items) {
      if (!item.serviceId || !mongoose.isValidObjectId(item.serviceId)) {
        return res
          .status(400)
          .json({ error: `Invalid service ID: ${item.serviceId}` });
      }
      if (typeof item.basePrice !== "number" || isNaN(item.basePrice)) {
        return res.status(400).json({ error: "Invalid base price format" });
      }
    }

    // Create and save order
    const newOrder = new ServiceOrder({
      user: user_id,
      items: items.map((item) => ({
        serviceId: item.serviceId,
        serviceName: item.serviceName,
        basePrice: item.basePrice,
        finalPrice: item.finalPrice ?? item.basePrice,
        quantity: item.quantity,
        featureImage: item.featureImage,
        selectedVariations: item.selectedVariations || [],
        formData: item.formData || {},
      })),
      deliveryType,
      totalCost,
      phoneNumber,
      paypalOrderId,
      billingDetails,
      status: "Pending",
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder.toObject(), // Convert Mongoose document to plain object
    });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({
      error: "Order processing failed",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Fetch all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await ServiceOrder.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Fetch orders by user ID
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await ServiceOrder.find({ user: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
};

// Cancel order
// Modify cancelOrder controller
const cancelOrder = async (req, res) => {
  try {
    const order = await ServiceOrder.findByIdAndUpdate(
      req.body.orderId,
      {
        status: "Cancelled",
        order_cancelled: true,
        percentage_complete: 0,
        cancellation_date: new Date(),
      },
      { new: true } // Return updated document
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order: order.toObject(), // Convert to plain object
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ error: "Failed to cancel order" });
  }
};

// Fetch order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await ServiceOrder.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

module.exports = {
  confirmOrder,
  getAllOrders,
  getOrdersByUser,
  cancelOrder,
  getOrderById,
};
