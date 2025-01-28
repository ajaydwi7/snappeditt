const ServiceOrder = require("../models/ServiceOrder");
const Cart = require("../models/Cart");
const User = require("../models/User");

// Controller for confirming the order
const confirmOrder = async (req, res) => {
  const {
    user_id,
    deliveryType,
    phoneNumber,
    services,
    totalCost,
    paypalOrderId,
    billingDetails,
  } = req.body;

  console.log("Confirming order with data:", req.body);

  try {
    // Validate required fields
    if (
      !user_id ||
      !deliveryType ||
      !phoneNumber ||
      !services ||
      !totalCost ||
      !paypalOrderId ||
      !billingDetails ||
      !billingDetails.name ||
      !billingDetails.email ||
      !billingDetails.address ||
      !billingDetails.city ||
      !billingDetails.state ||
      !billingDetails.zip ||
      !billingDetails.phone
    ) {
      console.error("Missing required fields in order payload");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create new order
    const newOrder = new ServiceOrder({
      user: user_id,
      services,
      deliveryType,
      totalCost,
      phoneNumber,
      paypalOrderId,
      billingDetails,
      status: "Pending",
    });

    // Save order to the database
    await newOrder.save();
    console.log("Order saved successfully:", newOrder);

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};
// Controller for fetching all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await ServiceOrder.find();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
};

// Controller for fetching orders by user ID
const getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await ServiceOrder.find({ user: userId });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
};

// Controller for cancelling the order
const cancelOrder = async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await ServiceOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.order_cancelled) {
      return res.status(400).json({ error: "Order already cancelled" });
    }

    order.status = "Cancelled";
    order.order_cancelled = true; // Explicitly set to true
    order.percentage_complete = 0;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ error: "Failed to cancel order" });
  }
};

// Controller for fetching an order by ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await ServiceOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  confirmOrder,
  getOrdersByUser,
  getAllOrders,
  cancelOrder,
  getOrderById,
};
