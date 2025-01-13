const express = require("express");
const router = express.Router();
const cartController = require("../Controller/cartController");

// Update route paths
router.post("/add", cartController.addToCart);
router.get("/:userId", cartController.getCart);
router.post("/remove", cartController.removeFromCart);
router.delete("/clear/:userId", cartController.clearCart);

module.exports = router;
