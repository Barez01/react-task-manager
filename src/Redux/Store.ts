import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/Redux/AuthReducer";
import homeReducer from "../Features/Home/Redux/HomeReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
  },
});

/* ================= TYPES ================= */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;