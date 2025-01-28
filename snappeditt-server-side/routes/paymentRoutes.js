const express = require("express");
const { client } = require("../helper/paypal");
const paypal = require("@paypal/checkout-server-sdk");
const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post(
  "/create-order",
  asyncHandler(async (req, res) => {
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
              item_total: { currency_code: "USD", value: orderTotal },
            },
          },
          items: items.map((item) => ({
            name: item.name,
            unit_amount: {
              currency_code: "USD",
              value: item.unit_amount.value,
            },
            quantity: item.quantity,
          })),
        },
      ],
    });

    const order = await client.execute(request);
    res.status(200).json({
      id: order.result.id,
      status: order.result.status,
    });
  })
);

router.post(
  "/capture-order/:orderId",
  asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    const { payerId } = req.body;

    console.log("Capturing PayPal order with orderId:", orderId);
    console.log("Payer ID:", payerId);

    if (!orderId || !payerId) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({
      payer_id: payerId,
    });

    try {
      const capture = await client.execute(request);
      console.log("PayPal capture response:", capture);

      if (capture.result.status === "COMPLETED") {
        res.status(200).json({
          id: capture.result.id,
          status: capture.result.status,
          payer: capture.result.payer,
          purchase_units: capture.result.purchase_units.map((unit) => ({
            ...unit,
            amount: unit.amount || { value: "0.00", currency_code: "USD" },
          })),
        });
      } else {
        res.status(400).json({ error: "Payment capture failed" });
      }
    } catch (error) {
      console.error("Error capturing payment:", error);
      res.status(500).json({
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  })
);

module.exports = router;
