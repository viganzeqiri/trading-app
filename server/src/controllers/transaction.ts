import { type Request, type Response } from "express";

import { Transaction } from "../models/Transaction";
import { User } from "../models/User";

const createTransaction = async (
  req: Request<
    object,
    object,
    { userId: string; type: string; amount: number }
  >,
  res: Response
) => {
  try {
    const { userId, type, amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (type === "sell" && user.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    user.balance =
      type === "sell" ? user.balance - amount : user.balance + amount;
    await user.save();

    const transaction = new Transaction({
      userId,
      type,
      amount,
      timestamp: new Date(),
    });
    await transaction.save();

    res.status(201).json({ transaction });
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
