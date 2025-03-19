const mongoose = require("mongoose"); // Add this at the top
const ServiceOrder = require("../models/ServiceOrder");
const { generateInvoice } = require("../utils/pdfGenerator");
const { sendOrderConfirmationEmail } = require("../utils/emailSender");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");

// Confirm order
const confirmOrder = async (req, res) => {
  const {
    user_id,
    items,
    totalCost,
    paypalOrderId,
    billingDetails,
    couponCode,
    discount,
  } = req.body;

  try {
    // Validate required fields
    const requiredFields = [user_id, items, totalCost, billingDetails];
    if (
      !user_id ||
      !items ||
      typeof totalCost === "undefined" ||
      !billingDetails
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Add conditional PayPal validation
    if (totalCost > 0) {
      if (!paypalOrderId) {
        return res
          .status(400)
          .json({ error: "PayPal order ID required for paid orders" });
      }
      if (typeof paypalOrderId !== "string") {
        return res
          .status(400)
          .json({ error: "Invalid PayPal order ID format" });
      }
    }

    if (totalCost === 0 && paypalOrderId) {
      return res
        .status(400)
        .json({ error: "PayPal ID not allowed for free orders" });
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
    // Add coupon validation logic
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });
      if (!coupon) return res.status(400).json({ error: "Invalid coupon" });
      if (coupon.timesUsed >= coupon.maxUses)
        return res.status(400).json({ error: "Coupon usage limit reached" });

      coupon.timesUsed += 1;
      await coupon.save();
    }
    // Create and save order
    const orderPayload = new ServiceOrder({
      user: user_id,
      totalCost,
      billingDetails,
      couponCode: couponCode || null,
      discountApplied: discount || 0,
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
      status: "Pending",
      paymentStatus: totalCost === 0 ? "Completed" : "Pending",
    });
    // Only add paypalOrderId for paid orders
    if (totalCost > 0) {
      orderPayload.paypalOrderId = paypalOrderId;
    }

    const newOrder = new ServiceOrder(orderPayload);
    newOrder.invoiceUrl = `/api/order/${newOrder._id}/invoice`;

    await newOrder.save();
    // Generate invoice
    const user = await User.findById(user_id);
    const invoicePath = await generateInvoice(newOrder, user);
    // Update the order with invoice URL
    // const updatedOrder = await ServiceOrder.findByIdAndUpdate(
    //   newOrder._id,
    //   {
    //     $set: {
    //       invoiceUrl: `/api/order/${newOrder._id}/invoice`,
    //     },
    //   },
    //   { new: true }
    // );

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail(user.email, newOrder, invoicePath);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: {
        ...newOrder.toObject(),
        paymentStatus: newOrder.paymentStatus,
        invoiceUrl: `/order/${newOrder._id}/invoice`,
      },
      // order: updatedOrder.toObject(),
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

const getOrderInvoice = async (req, res) => {
  try {
    const order = await ServiceOrder.findById(req.params.orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    const invoicePath = path.join(
      __dirname,
      "../invoices",
      `invoice-${order._id}.pdf`
    );

    if (!fs.existsSync(invoicePath)) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    const fileStream = fs.createReadStream(invoicePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Failed to fetch invoice" });
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
  getOrderInvoice,
};
