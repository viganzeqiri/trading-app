import axios from "axios";
import { type Request, type Response } from "express";

const getBitcoinPrice = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  );

  return response.data.bitcoin.usd;
};

const getCurrentBitcoinPrice = async (_: Request, response: Response) => {
  try {
    const bitcoinPrice = await getBitcoinPrice();
    response.json({ price: bitcoinPrice });
  } catch (error) {
    console.error("Error retrieving Bitcoin price:", error);
    response.status(500).json({ error: "Server error" });
  }
};

export { getBitcoinPrice, getCurrentBitcoinPrice };
