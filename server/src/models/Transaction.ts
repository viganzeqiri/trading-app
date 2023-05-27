import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transactionHash: {
    type: String,
    required: true,
    unique: true,
  },
  blockNumber: {
    type: Number,
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  value: {
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export { Transaction };
