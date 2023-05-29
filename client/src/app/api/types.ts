export interface User {
  _id: string;
  publicKey: string;
  privateKey: string;
  balance: number;
  transactions: [];
  createdAt: Date | null;
  __v: number;
}

export interface Transaction {
  _id: string;
  type: "buy" | "sell";
  amount: number;
  userId: string;
  timestamp: Date | null;
}
