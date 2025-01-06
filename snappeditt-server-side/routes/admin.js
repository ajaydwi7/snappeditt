const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const adminController = require("../Controller/adminController");

// Dashboard
router.get("/dashboard", checkAuth, adminController.getDashboard);

// Products
router.get("/products", checkAuth, adminController.getProducts);
router.post("/products", checkAuth, adminController.addProduct);

// Orders
router.get("/orders", checkAuth, adminController.getOrders);

// Users
router.get("/users", checkAuth, adminController.getUsers);

router.get("/reports", checkAuth, adminController.getReports);

module.exports = router;
