import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/Redux/AuthReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

/* ================= TYPES ================= */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;