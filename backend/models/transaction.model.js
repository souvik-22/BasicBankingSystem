const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    sendUserId: {
      type: Number,
      required: true,
    },
    getUserId: {
      type: Number,
      required: true,
    },
    sendUsername: {
      type: String,
      required: true,
    },
    getUsername: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("transaction", TransactionSchema);
module.exports = Transaction;
