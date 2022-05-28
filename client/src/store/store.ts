import { configureStore } from "@reduxjs/toolkit";
import isLoginSlice from "../slices/isLoginSlice";
import modalSlice from "../slices/modalSlice";
import splashSlice from "../slices/splashSlice";

export const store = configureStore({
  reducer: {
    isLogin: isLoginSlice,
    splash: splashSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
