import { type Request, type Response } from "express";

import { Transaction } from "../models/Transaction";
import { User } from "../models/User";
import { getBitcoinPrice } from "./bitcoin";

const createTransaction = async (
  req: Request<
    object,
    object,
    { userId: string; type: string; btcAmount: number }
  >,
  res: Response
) => {
  try {
    const { userId, type, btcAmount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const btcPriceUsdt = await getBitcoinPrice();

    const usdtAmount = btcAmount * btcPriceUsdt;

    if (type === "buy" && user.usdtBalance < usdtAmount) {
      return res.status(400).json({ error: "Insufficient USDT balance" });
    }

    if (type === "sell" && user.btcBalance < btcAmount) {
      return res.status(400).json({ error: "Insufficient BTC balance" });
    }

    user.usdtBalance =
      type === "buy"
        ? user.usdtBalance - usdtAmount
        : user.usdtBalance + usdtAmount;

    user.btcBalance =
      type === "buy"
        ? user.btcBalance + btcAmount
        : user.btcBalance - btcAmount;

    await user.save();

    const transaction = new Transaction({
      userId,
      type,
      btcAmount,
      timestamp: new Date(),
    });
    await transaction.save();

    res.status(201).json({});
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllTransactions = async (_: Request, response: Response) => {
  try {
    const transactions = await Transaction.find().sort("-timestamp");
    response.json(transactions);
  } catch (error) {
    console.error("Error getting transactions:", error);
    response.status(500).json({ error: "Server error" });
  }
};

export { createTransaction, getAllTransactions };
