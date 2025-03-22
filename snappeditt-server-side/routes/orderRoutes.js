const express = require("express");
const {
  cancelOrder,
  getOrdersByUser,
  confirmOrder,
  getAllOrders,
  getOrderById,
  getOrderInvoice,
} = require("../Controller/orderController");

const router = express.Router();

// Order Routes

// Route to confirm an order
router.post("/confirm", confirmOrder);

// Route to fetch all orders (Admin or authorized user)
router.get("/get-all-orders", getAllOrders);

// Route to fetch orders by user ID
router.get("/user/:userId", getOrdersByUser);

// Route to cancel an order
router.post("/cancel", cancelOrder);

// Route to fetch a single order by ID
router.get("/:orderId", getOrderById);
router.get("/:orderId/invoice", getOrderInvoice);

module.exports = router;
