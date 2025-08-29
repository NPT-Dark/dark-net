import * as mediasoupClient from "mediasoup-client";
import { Socket } from "socket.io-client";

export async function startCall({
  socket,
  roomId,
  callerId,
  receiverIds,
  stream,
}: {
  socket: Socket;
  roomId: string;
  callerId: string;
  receiverIds: string[];
  stream: MediaStream;
}) {
  const device = new mediasoupClient.Device();
  const routerRtpCapabilities = await new Promise<any>((resolve) => {
    socket.emit("get-rtp-capabilities", resolve);
  });
  await device.load({ routerRtpCapabilities });
  const transportOptions = await new Promise<any>((resolve) => {
    socket.emit("create-transport", resolve);
  });

  const sendTransport = device.createSendTransport(transportOptions);

  sendTransport.on("connect", ({ dtlsParameters }, callback) => {
    socket.emit("connect-transport", { dtlsParameters }, callback);
  });

  sendTransport.on("produce", ({ kind, rtpParameters }, callback) => {
    socket.emit(
      "produce",
      { kind, rtpParameters },
      ({ id }: { id: string }) => {
        callback({ id });
        receiverIds.forEach((receiverId) => {
          socket.emit("new-producer", {
            roomId,
            producerId: id,
            kind,
            from: callerId,
            to: receiverId,
          });
        });
      }
    );
  });

  for (const track of stream.getTracks()) {
    await sendTransport.produce({ track });
  }

  console.log("✅ Caller started streaming");
}

export async function answerCall({
  socket,
  videoElement,
}: {
  socket: Socket;
  videoElement?: HTMLVideoElement | null;
}) {
  const device = new mediasoupClient.Device();

  // Lấy thông tin RTP của router từ server
  const routerRtpCapabilities = await new Promise<any>((resolve) => {
    socket.emit("get-rtp-capabilities", resolve);
  });
  await device.load({ routerRtpCapabilities });

  // Tạo recv transport
  const transportOptions = await new Promise<any>((resolve) => {
    socket.emit("create-consumer-transport", resolve);
  });

  const recvTransport = device.createRecvTransport(transportOptions);

  recvTransport.on("connect", ({ dtlsParameters }, callback) => {
    socket.emit("connect-consumer-transport", { dtlsParameters }, callback);
  });

  const mediaStreams: Record<string, MediaStream> = {};

  socket.on("new-producer", async ({ producerId, kind }) => {
    console.log("📥 New producer received:", kind, producerId);

    const { id, rtpParameters } = await new Promise<any>((resolve) => {
      socket.emit(
        "consume",
        {
          producerId,
          rtpCapabilities: device.rtpCapabilities,
        },
        resolve
      );
    });

    const consumer = await recvTransport.consume({
      id,
      producerId,
      kind,
      rtpParameters,
    });

    // Tạo hoặc thêm track vào stream theo kind
    if (!mediaStreams[kind]) {
      mediaStreams[kind] = new MediaStream();
    }

    mediaStreams[kind].addTrack(consumer.track);

    if (kind === "video" && videoElement) {
      videoElement.srcObject = mediaStreams[kind];
      videoElement.play().catch(console.error);
    }

    console.log(`✅ Đã consume ${kind}`);
  });

  console.log("🎧 Ready to receive streams");
}
