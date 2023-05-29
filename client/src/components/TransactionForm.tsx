import { useRef, FormEvent } from "react";
import { useLazyGetUserQuery } from "../app/api/auth";

import {
  useCreateTransactionMutation,
  useLazyGetTransactionsQuery,
} from "../app/api/transactions";
import { selectUser, setUser } from "../app/features/userSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import { type AuthFormError } from "./AuthForm";

interface IProps {
  type: "buy" | "sell";
}

export type TransactionFormData = {
  btcAmount: string;
};

export default function TransactionForm({ type }: IProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sendTransaction, { error, isLoading }] =
    useCreateTransactionMutation();
  const [refetchTransactions] = useLazyGetTransactionsQuery();
  const [getUser] = useLazyGetUserQuery();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { btcAmount } = Object.fromEntries(formData) as TransactionFormData;

    if (!user || !btcAmount) return;

    await sendTransaction({
      btcAmount: Number(btcAmount),
      type,
      userId: user?._id,
    });

    formRef.current?.reset();
    refetchTransactions({});

    dispatch(setUser((await getUser({ userId: user?._id }).unwrap()).user));
  }

  return (
    <div className="card w-80 bg-white text-gray">
      <div className="card-body">
        <h2 className="card-title mb-4"> {type === "buy" ? "Buy" : "Sell"}</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            name="btcAmount"
            type="text"
            placeholder="BTC"
            className="input input-bordered w-full max-w-xs"
          />

          <button
            className={`btn w-full bg-yellow border-0 mt-4 ${
              isLoading ? "loading" : ""
            }`}
          >
            {type === "buy" ? "Buy" : "Sell"}
          </button>

          {!!error && (
            <p className="text-error">{(error as AuthFormError).data.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
