const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  products: { type: Array },
});

module.exports = mongoose.model("Product", productSchema);
