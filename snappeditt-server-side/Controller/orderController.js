const ServiceOrder = require("../models/ServiceOrder");
const User = require("../models/User");

// Controller for confirming the order
const confirmOrder = async (req, res) => {
  const {
    user_id,
    services,
    deliveryType,
    deliveryCost,
    totalCost,
    phoneNumber,
  } = req.body;

  if (!user_id || !services || !phoneNumber || !deliveryType) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate expected delivery date based on delivery type
    const currentDate = new Date();
    const expectedDeliveryDate =
      deliveryType === "Express"
        ? new Date(currentDate.setDate(currentDate.getDate() + 5)) // 3 days for Express
        : new Date(currentDate.setDate(currentDate.getDate() + 7)); // 7 days for Standard

    const newOrder = new ServiceOrder({
      user: user_id,
      services: services.map((service) => ({
        serviceId: service.id,
        serviceName: service.name,
        serviceDescription: service.description || "",
        price: service.price,
        quantity: service.quantity,
        totalPrice: service.totalPrice,
        featureImage: service.featureImage,
        formData: service.formData || {},
      })),
      deliveryType,
      deliveryCost,
      totalCost,
      phoneNumber,
      status: "Pending",
      percentage_complete: 0,
      expected_delivery_date: expectedDeliveryDate, // Save calculated date
    });

    const savedOrder = await newOrder.save();
    res.status(200).json({
      success: true,
      message: "Order confirmed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
