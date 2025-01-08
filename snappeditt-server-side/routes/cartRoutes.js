const express = require("express");
const router = express.Router();
const cartController = require("../Controller/cartController");

router.post("/cart/add", cartController.addToCart);
router.get("/cart/:userId", cartController.getCart);
router.delete("/cart/clear/:userId", cartController.clearCart);

module.exports = router;
