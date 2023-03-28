const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  operation: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
