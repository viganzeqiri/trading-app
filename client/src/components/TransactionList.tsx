import { useGetTransactionsQuery } from "../app/api/transactions";
import { Transaction } from "../app/api/types";
import Spinner from "./Spinner";

export default function TransactionList() {
  const { data, isLoading } = useGetTransactionsQuery({});

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <h2 className="text-center text-yellow mb-4">Transactions</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {(data || []).map((tx: Transaction) => (
            <div
              key={tx._id}
              className="flex flex-col card w-80 bg-white p-4 m-4"
            >
              <p>
                User: <span>{tx.userId}</span>{" "}
              </p>
              <p>
                Amount: <span>{tx.amount}</span>{" "}
              </p>
              <p>
                Type: <span>{tx.type === "buy" ? "BUY" : "SELL"}</span>
              </p>
              <p>
                At:{" "}
                <span>
                  {new Date(tx?.timestamp as Date).toLocaleString("en-US")}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
