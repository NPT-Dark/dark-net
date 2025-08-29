import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserChat } from "~/types/user";

type ChatPopupState = {
  listChat: IUserChat[];
};

const initialState: ChatPopupState = {
  listChat: [],
};

const chatPopupSlice = createSlice({
  name: "chatPopup",
  initialState,
  reducers: {
    pushChatPopup(state, action: PayloadAction<IUserChat>) {
      state.listChat.unshift(action.payload);
    },
    removeChatPopup(state, action: PayloadAction<string>) {
      state.listChat = state.listChat.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { pushChatPopup, removeChatPopup } = chatPopupSlice.actions;
export default chatPopupSlice.reducer;
