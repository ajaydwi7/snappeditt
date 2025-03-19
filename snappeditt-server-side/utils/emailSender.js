const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendOrderConfirmationEmail = async (email, order, invoicePath) => {
  const mailOptions = {
    from: `"SnappEditt" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Order Confirmation - #${order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d3748;">Thank you for your order!</h2>
        <p>Your order (#${
          order._id
        }) has been successfully placed on our Website. We shall verify your payment and process your order soon.</p>
        <h3 style="color: #2d3748;">Order Summary</h3>
        <p></p>
        <ul>
          ${order.items
            .map(
              (item) => `
            <li>
              ${item.serviceName} (Qty: ${item.quantity}) - 
              $${item.finalPrice.toFixed(2)}/each
            </li>
          `
            )
            .join("")}
        </ul>
        <p><strong>Total: $${order.totalCost.toFixed(2)}</strong></p>
        <p>Please feel free to connect us through support chat or email.</p>
        <p>Regards</p>
        <p>Team Snapp Editt</p>
        <p>Find your invoice attached to this email.</p>
      </div>
    `,
    attachments: [
      {
        filename: `invoice-${order._id}.pdf`,
        path: invoicePath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};
