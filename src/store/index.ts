import { configureStore } from "@reduxjs/toolkit";
import reviewImgReducer from "./slices/reviewImgSlice";
import chatPopUpReducer from "./slices/chatPopup";
import roomCallReducer from "./slices/roomCall";

export const store = configureStore({
  reducer: {
    reviewImg: reviewImgReducer,
    chatPopup: chatPopUpReducer,
    roomCall: roomCallReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
