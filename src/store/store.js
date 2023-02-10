import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import popupSlice from "./popupSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    popup: popupSlice,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export default store;
