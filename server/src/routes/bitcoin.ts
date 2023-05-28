import express from "express";
import * as bitcoinController from "../controllers/bitcoin";

const bitcoinRouter = express.Router();

bitcoinRouter.get("/price", bitcoinController.getCurrentBitcoinPrice);

export default bitcoinRouter;
