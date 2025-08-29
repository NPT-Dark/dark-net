import { socket } from "~/providers/socket";
import {
  connectTransport,
  getStream,
  listenConsumer,
  listenProducer,
  sendProducer,
  setupTransports,
  verifyUser,
} from "./services";
import { SetStateAction } from "react";
import { emitWithAck } from "~/hooks/useEmitWithAck";
import { TransportType } from "./type";

type SetupCallerType = {
  roomId: string;
  userId: string;
  setReceiverTransport: React.Dispatch<SetStateAction<TransportType | null>>;
  setLocalVideo: React.Dispatch<SetStateAction<MediaStream | null>>;
  setReceiverVideo: React.Dispatch<SetStateAction<MediaStream[]>>;
  setRtpCapabilities: React.Dispatch<SetStateAction<any>>;
};

export default async function setupCall({
  roomId,
  userId,
  setReceiverTransport,
  setLocalVideo,
  setReceiverVideo,
  setRtpCapabilities,
}: SetupCallerType) {
  const emitAsync = emitWithAck(socket);

  //** Verify */
  const { roomInfo, isCaller } = await verifyUser({
    roomId,
    userId,
  });

  //** Register Room */
  if (isCaller) {
    const { error } = await emitAsync("create-room-router", roomId);
    if (error) return window.close();
  }

  //** Get All Tracks */
  const { stream, tracks } = await getStream({ type: "audio" });
  setLocalVideo(stream);

  //** 4. Setup Transports */
  const { sendTransport, recvTransport, rtpCapabilitiesClient } =
    await setupTransports({
      socket,
      roomId,
      userId,
    });

  if (!sendTransport || !recvTransport)
    throw new Error("Failed to create transports");

  //** Connect Transports */
  const connectedSend = await connectTransport({
    transport: recvTransport,
    socket,
    roomId,
    userId,
    type: "recv",
  });
  if (!connectedSend) {
    throw new Error("Failed to connect receive transport");
  }
  const connectedRecv = await connectTransport({
    transport: sendTransport,
    socket,
    roomId,
    userId,
    type: "send",
  });
  if (!connectedRecv) {
    throw new Error("Failed to connect send transport");
  }
  setReceiverTransport(recvTransport);
  setRtpCapabilities(rtpCapabilitiesClient);

  //** Listen Producer */
  await listenProducer({ transport: sendTransport, socket, roomId, userId });

  //** Send Producer */
  const sendPromises = Object.keys(tracks)
    .filter((trackId) => tracks[trackId])
    .map(async (trackId) => {
      console.log(tracks[trackId]);
      await sendProducer({
        transport: sendTransport,
        track: tracks[trackId],
      });
    });
  await Promise.all(sendPromises);

  //** Listen Consumer */
  const streamData = await listenConsumer({
    socket,
    transport: recvTransport,
    roomId,
    userId,
    rtpCapabilitiesClient,
  });
  if (streamData) {
    setReceiverVideo((prev) => [...prev, streamData]);
  } else {
    console.warn("No consumers available for the room");
  }

  //** Notify */
  socket.emit("register", roomId);
  if (!isCaller) {
    socket.emit("accept-join-room", {
      roomId,
      userId,
    });
  } else {
    const arrReceiver: string[] = roomInfo?.receiverIds || [];
    arrReceiver.map((receiverId) => {
      socket.emit(
        "make-call",
        {
          callType: "audio",
          caller: userId,
          receivers: arrReceiver,
          roomId,
        },
        receiverId
      );
    });
  }
  return { roomInfo, isCaller };
}
