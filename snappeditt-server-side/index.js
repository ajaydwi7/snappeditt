require("dotenv").config();

const express = require("express");
const routes = require("./routes/apis");
const paymentRoutes = require("./routes/paymentRoutes");
const cartRoutes = require("./routes/cartRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const freeTrialRoutes = require("./routes/freeTrialRoutes");
const adminRoutes = require("./routes/admin");
const couponRoutes = require("./routes/couponRoutes");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const uri = process.env.MONGO_DB_URI;
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
//import { v2 as cloudinary } from 'cloudinary';

app.use(cookieParser());
// connect to mongodb

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

cloudinary.config({
  cloud_name: "dyoqduyyu",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// (async function () {
//   const results = await cloudinary.uploader.upload("./images/1376073.jpg");
//   console.log(results);

//   const URL = cloudinary.url(results.public_id, {
//     transformation: [
//       {
//         qulity: "auto",
//         fetch_format: "auto",
//       },
//       {
//         width: 1200,
//         height: 1200,
//       },
//     ],
//   });
//   console.log(URL);
// })();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://localhost:")) {
        callback(null, true); // Allow any localhost port
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
// initialize middleware
app.use(bodyParser.json());

// Middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", routes, contactRoutes, freeTrialRoutes);

//adminroutesconst adminRoutes = require('./routes/admin');
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/paypal", paymentRoutes);
app.use("/api/coupons", couponRoutes);
// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
