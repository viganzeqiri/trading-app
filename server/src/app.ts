import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db";

import bitcoinRouter from "./routes/bitcoin";
import transactionRouter from "./routes/transaction";
import userRouter from "./routes/user";

connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api/bitcoin", bitcoinRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
