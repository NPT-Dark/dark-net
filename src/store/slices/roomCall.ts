import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMakeCallData } from "~/types/call";
import { IUserChat } from "~/types/user";

type ChatPopupState = {
  makeCallData: IMakeCallData;
};

const initialState: ChatPopupState = {
  makeCallData: {
    to: "",
    from: "",
    signalData: {
      type: "offer",
      sdp: "",
    },
    callerInfo: {
      name: "",
      profileImage: "",
    },
  },
};

const chatPopupSlice = createSlice({
  name: "call ",
  initialState,
  reducers: {
    pushChatPopup(state, action: PayloadAction<IUserChat>) {
      state.listChat.unshift(action.payload);
    },
  },
});

export const { pushChatPopup } = chatPopupSlice.actions;
export default chatPopupSlice.reducer;
