import express from "express";

import * as transactionController from "../controllers/transaction";
import { authorize } from "../middleware/auth";

const transactionRouter = express.Router();

transactionRouter.get("/", transactionController.getAllTransactions);
transactionRouter.post("/", authorize, transactionController.createTransaction);

export default transactionRouter;
