import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CallState } from "~/types/call";

const initialState: CallState = {
  infoCall: {
    roomId: "",
    from: "",
    peers: {},
    callerInfo: {
      id: "",
      name: "",
      profileImage: "",
    },
    receiverInfos: {},
  },
};

const roomCallSlice = createSlice({
  name: "roomCall",
  initialState,
  reducers: {
    setRoomId(state, action: PayloadAction<string>) {
      state.infoCall.roomId = action.payload;
    },
    setFrom(state, action: PayloadAction<string>) {
      state.infoCall.from = action.payload;
    },
    setCallerInfo(
      state,
      action: PayloadAction<{ id: string; name: string; profileImage: string }>
    ) {
      state.infoCall.callerInfo = action.payload;
    },
    setReceiverInfo(
      state,
      action: PayloadAction<{
        userId: string;
        name: string;
        profileImage: string;
      }>
    ) {
      state.infoCall.receiverInfos[action.payload.userId] = {
        id: action.payload.userId,
        name: action.payload.name,
        profileImage: action.payload.profileImage,
      };
    },
    setPeerOffer(
      state,
      action: PayloadAction<{
        peerId: string;
        offer: RTCSessionDescriptionInit;
      }>
    ) {
      const peer = state.infoCall.peers[action.payload.peerId] ?? {
        offer: action.payload.offer,
        iceCandidates: [],
      };
      peer.offer = action.payload.offer;
      state.infoCall.peers[action.payload.peerId] = peer;
    },
    setPeerAnswer(
      state,
      action: PayloadAction<{
        peerId: string;
        answer: RTCSessionDescriptionInit;
      }>
    ) {
      const peer = state.infoCall.peers[action.payload.peerId];
      if (peer) {
        peer.answer = action.payload.answer;
      }
    },
    addPeerIceCandidate(
      state,
      action: PayloadAction<{ peerId: string; candidate: RTCIceCandidateInit }>
    ) {
      const peer = state.infoCall.peers[action.payload.peerId];
      if (peer) {
        peer.iceCandidates.push(action.payload.candidate);
      }
    },
    resetCallState() {
      return initialState;
    },
  },
});

export const {
  setRoomId,
  setFrom,
  setCallerInfo,
  setReceiverInfo,
  setPeerOffer,
  setPeerAnswer,
  addPeerIceCandidate,
  resetCallState,
} = roomCallSlice.actions;

export default roomCallSlice.reducer;
