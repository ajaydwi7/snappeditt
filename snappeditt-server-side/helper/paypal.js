const paypal = require("@paypal/checkout-server-sdk");

// Creating an environment
let environment;
if (process.env.NODE_ENV === "production") {
  environment = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
} else {
  environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
}

// Creating a client
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = { paypal, client };
