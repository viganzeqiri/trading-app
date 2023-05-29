import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

import { type RootState } from "../../app/store";
import { type User } from "../api/types";

const initialState: { userInfo: User | null } = {
  userInfo: null,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    clearUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUser, clearUser } = counterSlice.actions;

export const selectUser = (state: RootState) => state.user.userInfo;

export default counterSlice.reducer;
