import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "../interfaces/types";

const initialState = {
  full_name: "",
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUserData: (
      state,
      action: PayloadAction<{
        full_name: string;
        username: string;
        email: string;
      }>,
    ) => {
      const { full_name, username, email } = action.payload;
      state.full_name = full_name;
      state.username = username;
      state.email = email;
    },
  },
});

export const { changeUserData } = userSlice.actions;
export default userSlice.reducer;
