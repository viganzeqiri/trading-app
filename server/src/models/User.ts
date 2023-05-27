import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  publicKey: {
    type: String,
    required: true,
    unique: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export { User };
