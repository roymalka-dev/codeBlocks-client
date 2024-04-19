import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RoleType = "USER" | "OBSERVER" | null;

interface UserState {
  role: RoleType;
}

const initialState: UserState = {
  role: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<RoleType>) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = userSlice.actions;
export default userSlice.reducer;
