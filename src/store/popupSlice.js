import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "data",
  initialState: {
    isPopup: false,
  },
  reducers: {
    setPopup(state, action) {
      state.isPopup = action.payload;
    },
  },
});
export const { setPopup } = popupSlice.actions;
export default popupSlice.reducer;
