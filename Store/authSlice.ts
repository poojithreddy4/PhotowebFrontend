import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState, // 🛠️ spelling was wrong ("intialState" → "initialState")
  reducers: {
    setAuthUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    }, // ✅ use comma here, not semicolon
  },
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;
