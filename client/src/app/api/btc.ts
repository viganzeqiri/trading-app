import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const btcPriceApi = createApi({
  reducerPath: "btcPriceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/bitcoin",
  }),
  endpoints: (builder) => ({
    getBTCPrice: builder.query({
      query: () => ({
        url: "/price",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBTCPriceQuery } = btcPriceApi;
