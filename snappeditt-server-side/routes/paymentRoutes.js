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
    res.status(200).json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Capture PayPal payment
router.post("/capture-order/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.status(200).json({ status: capture.result.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
