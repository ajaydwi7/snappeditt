const express = require("express");
const authController = require("../Controller/authController");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

// Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
// Add this route to your backend API routes
router.get("/users", checkAuth, (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: "Failed to fetch users" }));
});

module.exports = router;
