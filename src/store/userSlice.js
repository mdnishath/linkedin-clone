import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "data",
  initialState: {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
