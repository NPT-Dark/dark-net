import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserChat } from "~/types/user";

type ChatPopupState = {
  listChat: IUserChat[];
};

const initialState: ChatPopupState = {
  listChat: [],
};

const chatPopupSlice = createSlice({
  name: "reviewImg",
  initialState,
  reducers: {
    pushChatPopup(state, action: PayloadAction<IUserChat>) {
      state.listChat.unshift(action.payload);
    },
  },
});

export const { pushChatPopup } = chatPopupSlice.actions;
export default chatPopupSlice.reducer;
