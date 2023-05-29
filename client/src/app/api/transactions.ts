import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { type Transaction } from "./types";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/transactions",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    createTransaction: builder.mutation<
      Transaction,
      { userId: string; type: "buy" | "sell"; amount: number }
    >({
      query: (credentials) => ({
        url: "",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useLazyGetTransactionsQuery,
} = transactionsApi;
