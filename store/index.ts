import { configureStore } from "@reduxjs/toolkit";
import wizardFormReducer from "@/store/features/wizardFormSlice";

export const store = configureStore({
  reducer: { wizardForm: wizardFormReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
