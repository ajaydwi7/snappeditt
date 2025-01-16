const express = require("express");
const { client } = require("../helper/paypal");
const paypal = require("@paypal/checkout-server-sdk");
const router = express.Router();

router.post("/create-order", async (req, res) => {
  const { orderTotal, items } = req.body;

  if (!orderTotal || !items || items.length === 0) {
    return res.status(400).json({ error: "Invalid request payload" });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: orderTotal,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: orderTotal,
            },
          },
        },
        items: items.map((item) => ({
          name: item.name,
          unit_amount: {
            currency_code: "USD",
            value: item.price,
          },
          quantity: item.quantity,
        })),
      },
    ],
  });

  try {
    const order = await client.execute(request);

    // Extract the approval URL from the response
    const approvalUrl = order.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.status(200).json({ id: order.result.id, approvalUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Capture PayPal payment
router.post("/capture-order/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  if (!orderId) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({}); // This can remain empty for capturing orders

  try {
    const capture = await client.execute(request);

    // Check if the order was successfully captured
    if (capture.result.status === "COMPLETED") {
      res.status(200).json({
        status: capture.result.status,
        captureDetails: capture.result, // Optional: Include full details
      });
    } else {
      res.status(400).json({
        error: "Payment could not be captured",
        status: capture.result.status,
      });
    }
  } catch (err) {
    console.error("Error capturing order:", err);
    res.status(500).json({
      error: "Failed to capture order",
      details: err.message, // Optional: Include detailed error for debugging
    });
  }
});

module.exports = router;
