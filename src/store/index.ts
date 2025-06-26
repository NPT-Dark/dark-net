import { configureStore } from "@reduxjs/toolkit";
import reviewImgReducer from "./slices/reviewImgSlice";

export const store = configureStore({
  reducer: {
    reviewImg: reviewImgReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
