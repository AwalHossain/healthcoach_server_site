const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
    },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
