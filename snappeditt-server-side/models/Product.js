// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const ProductSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, "Name field is required"],
//   },
//   description: {
//     type: String,
//     required: [true, "Description field is required"],
//   },
//   rating: {
//     type: Number,
//     default: 0,
//   },
//   price: {
//     type: Number,
//     required: [true, "Price field is required"],
//   },
//   price_before: {
//     type: Number,
//   },
//   times_bought: {
//     type: Number,
//     default: 0,
//   },
//   product_image: {
//     type: String,
//     required: false,
//   },
//   tags: {
//     type: String,
//     required: false,
//   },
// });

// ProductSchema.pre("save", function (next) {
//   this.price_before = this.price;
//   next();
// });

// const Product = mongoose.model("product", ProductSchema);

// module.exports = Product;
