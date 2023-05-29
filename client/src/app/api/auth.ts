import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { type User } from "./types";

interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/users",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      AuthResponse,
      { publicKey: string; privateKey: string }
    >({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<
      AuthResponse,
      { publicKey: string; privateKey: string }
    >({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query<{ user: User }, { userId: string }>({
      query: ({ userId }) => ({
        url: `/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazyGetUserQuery } =
  authApi;
