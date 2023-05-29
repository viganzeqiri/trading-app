export interface User {
  _id: string;
  publicKey: string;
  privateKey: string;
  btcBalance: number;
  usdtBalance: number;
  transactions: [];
  createdAt: Date | null;
  __v: number;
}

export interface Transaction {
  _id: string;
  type: "buy" | "sell";
  btcAmount: number;
  userId: string;
  timestamp: Date | null;
}
