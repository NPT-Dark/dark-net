import { Socket } from "socket.io-client";
import { AppDispatch } from "~/store";
import {
  setRoomId,
  setFrom,
  setCallerInfo,
  setReceiverInfo,
  setPeerOffer,
  setPeerAnswer,
} from "~/store/slices/roomCall";
import { InfoCallData } from "~/types/call";

export const dispatchCallerSide = ({
  dispatch,
  roomId,
  caller,
  receivers,
}: {
  dispatch: AppDispatch;
  roomId: string;
  caller: {
    id: string;
    name: string;
    profileImage: string;
  };
  receivers: {
    id: string;
    name: string;
    profileImage: string;
  }[];
}) => {
  console.log("dispatchCallerSide", { roomId, caller, receivers });

  dispatch(setRoomId(roomId));
  dispatch(setFrom(caller.id));
  dispatch(
    setCallerInfo({
      id: caller.id,
      name: caller.name,
      profileImage: caller?.profileImage || "",
    })
  );

  receivers.forEach((receiver) => {
    dispatch(
      setReceiverInfo({
        userId: receiver.id,
        name: receiver.name,
        profileImage: receiver?.profileImage || "",
      })
    );
  });
};

export const dispatchPeerOffer = async ({
  dispatch,
  socket,
  roomId,
  caller,
  receivers,
}: {
  dispatch: AppDispatch;
  socket: Socket;
  roomId: string;
  caller: {
    id: string;
    name: string;
    profileImage: string;
  };
  receivers: {
    id: string;
    name: string;
    profileImage: string;
  }[];
}) => {
  const receiverInfos = receivers.reduce<Record<string, typeof caller>>(
    (acc, receiver) => {
      acc[receiver.id] = receiver;
      return acc;
    },
    {}
  );
  for (const receiver of receivers) {
    const pc = new RTCPeerConnection();
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    dispatch(
      setPeerOffer({
        peerId: receiver.id,
        offer,
      })
    );

    const dataEmit: InfoCallData = {
      roomId,
      from: caller.id,
      peers: {
        [receiver.id]: {
          offer,
          iceCandidates: [],
        },
      },
      callerInfo: caller,
      receiverInfos,
    };
    socket.emit("make-call", dataEmit, receiver.id);
  }
};

export const dispatchReceiverSide = ({
  dispatch,
  roomId,
  callerId,
  callerInfo,
  answer,
}: {
  dispatch: AppDispatch;
  roomId: string;
  callerId: string;
  callerInfo: {
    id: string;
    name: string;
    profileImage: string;
  };
  answer: RTCSessionDescriptionInit;
}) => {
  dispatch(setRoomId(roomId));
  dispatch(setFrom(callerId));
  dispatch(setCallerInfo(callerInfo));

  dispatch(
    setPeerAnswer({
      peerId: callerId,
      answer,
    })
  );
};
