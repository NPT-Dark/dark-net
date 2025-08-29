import * as mediasoupClient from "mediasoup-client";
import { AppData, TransportOptions } from "mediasoup-client/types";
import {
  ListenProducerProps,
  ReceiveProducerProps,
  SendProducerProps,
  SetUpTransportProps,
  TransportType,
  VerifyUserProps,
} from "./type";
import { emitWithAck } from "~/hooks/useEmitWithAck";
type ParamTransportType = TransportOptions<AppData>;
type StreamType = "audio" | "video" | "all";

//** Verify User */
async function verifyUser({ roomId, userId }: VerifyUserProps) {
  let isCaller = false;
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/room?roomId=${roomId}`
  );
  if (!res.ok) {
    if (typeof window !== "undefined") window.close();
  }
  const roomGenerate = await res.json();
  if (
    !roomGenerate ||
    (roomGenerate.hostCallId !== userId &&
      !roomGenerate.receiverIds.includes(userId))
  ) {
    if (typeof window !== "undefined") window.close();
  }
  if (roomGenerate.hostCallId === userId) isCaller = true;

  return {
    roomInfo: roomGenerate,
    isCaller,
  };
}

//** Get RTP Capabilities */

async function getRTPCapabilities({
  socket,
  roomId,
  device,
}: {
  socket: any;
  roomId: string;
  device: mediasoupClient.types.Device;
}) {
  const rtpCapabilities: any = await new Promise((resolve, reject) => {
    socket.emit("get-rtp-capabilities", { roomId }, (data: any) => {
      if (data?.rtpCapabilities) {
        resolve(data.rtpCapabilities);
      } else {
        reject("❌ Không lấy được rtpCapabilities");
      }
    });
  });

  await device.load({ routerRtpCapabilities: rtpCapabilities });
  const rtpCapabilitiesClient = device.rtpCapabilities;
  if (!rtpCapabilitiesClient) {
    throw new Error("❌ Không lấy được rtpCapabilities từ device");
  }
  return rtpCapabilitiesClient;
}

//** Connect Transports */
async function connectTransport({
  transport,
  socket,
  roomId,
  userId,
  type,
}: {
  transport: TransportType;
  socket: any;
  roomId: string;
  userId: string;
  type: "send" | "recv";
}) {
  return transport.on(
    "connect",
    ({ dtlsParameters }, callback: any, errback: any) => {
      socket.emit(
        "connect-transport",
        { dtlsParameters, direction: type, roomId, userId },
        (res: any) => {
          if (res?.error) {
            console.error("❌ Send transport connect error:", res.error);
            errback?.(new Error(res.error));
            return false;
          } else {
            console.log("✅ Send transport connected");
            callback();
            return true;
          }
        }
      );
    }
  );
}

//** Create Transports */
async function createTransport({
  socket,
  roomId,
  userId,
  device,
  type,
}: {
  socket: any;
  roomId: string;
  userId: string;
  device: mediasoupClient.types.Device;
  type: "send" | "recv";
}) {
  const emitAsync = emitWithAck(socket);
  const params = await emitAsync("create-transport", {
    roomId,
    direction: type,
    userId,
  });
  if (params?.error) {
    throw new Error(`❌ Không thể tạo transport: ${params.error}`);
  }
  const transport = device.createSendTransport(
    params.data as ParamTransportType
  );
  return transport;
}

async function setupTransports({
  socket,
  roomId,
  userId,
}: SetUpTransportProps) {
  const device = new mediasoupClient.Device();

  const rtpCapabilitiesClient = await getRTPCapabilities({
    socket,
    roomId,
    device,
  });
  const sendTransport = await createTransport({
    socket,
    roomId,
    userId,
    device,
    type: "send",
  });
  const recvTransport = await createTransport({
    socket,
    roomId,
    userId,
    device,
    type: "recv",
  });

  return { sendTransport, recvTransport, rtpCapabilitiesClient };
}

async function listenProducer({
  transport,
  socket,
  roomId,
  userId,
}: ListenProducerProps) {
  transport.on(
    "produce",
    async ({ kind, rtpParameters }, callback, errback) => {
      try {
        const data: any = await new Promise((res, rej) => {
          console.log("produce", { kind, rtpParameters, roomId, userId });
          socket.emit(
            "produce",
            { kind, rtpParameters, roomId, userId },
            (response: any) => {
              if (response?.id) res(response);
              else rej(new Error("No producer ID from server"));
            }
          );
        });
        callback({
          id: data.id,
        });
      } catch (err) {
        console.error(err);
        errback(err as Error);
      }
    }
  );
}

async function sendProducer({
  transport,
  track,
}: SendProducerProps): Promise<mediasoupClient.types.Producer> {
  try {
    const producer = await transport.produce({ track });
    console.log(`✅ Producer được tạo với ID:`, producer.id);
    return producer;
  } catch (err) {
    console.error("❌ Lỗi khi produce:", err);
    throw err;
  }
}

async function getStream({ type }: { type: StreamType }) {
  const constraints: MediaStreamConstraints = {
    audio: {
      channelCount: 1,
      sampleRate: 48000,
      sampleSize: 16,
      autoGainControl: true,
      noiseSuppression: false,
      echoCancellation: false,
    },
    video: type === "video",
  };
  if (type === "audio") delete constraints.video;
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  const dataStream: {
    audio: MediaStreamTrack | null;
    video: MediaStreamTrack | null;
  } = {
    audio: null,
    video: null,
  };
  if (type === "audio") dataStream.audio = stream.getAudioTracks()[0];
  return {
    stream,
    tracks: dataStream,
  };
}
async function receiveConsumer({
  socket,
  producerId,
  rtpCapabilities,
  recvTransport,
  userId,
  roomId,
}: ReceiveProducerProps): Promise<mediasoupClient.types.Consumer | null> {
  return new Promise((resolve) => {
    socket.emit(
      "consume",
      {
        producerId,
        rtpCapabilities,
        roomId,
        userId,
      },
      async (response: {
        id: string;
        producerId: string;
        kind: "audio" | "video";
        rtpParameters: any;
        error?: string;
      }) => {
        try {
          if (response.error) {
            console.error("Consume error:", response.error);
            return resolve(null);
          }
          const consumer = await recvTransport.consume({
            id: response.id,
            producerId: response.producerId,
            kind: response.kind,
            rtpParameters: response.rtpParameters,
          });
          consumer.resume();
          resolve(consumer);
        } catch (error) {
          console.error("Failed to create consumer:", error);
          resolve(null);
        }
      }
    );
  });
}
async function listenConsumer({
  socket,
  transport,
  roomId,
  userId,
  rtpCapabilitiesClient,
}: {
  socket: any;
  transport: TransportType;
  roomId: string;
  userId: string;
  rtpCapabilitiesClient: any;
}) {
  const producers: Record<string, { id: string }[]> = await new Promise(
    (resolveInner) => {
      socket.emit("get-all-producers", { roomId }, resolveInner);
    }
  );
  const stream = new MediaStream();
  const consumePromises = Object.keys(producers)
    .filter((peerId) => peerId !== userId)
    .flatMap((peerId) =>
      producers[peerId].map(async (producer) => {
        const consumer = await receiveConsumer({
          socket,
          recvTransport: transport,
          producerId: producer.id,
          rtpCapabilities: rtpCapabilitiesClient,
          roomId,
          userId: peerId,
        });
        if (consumer) {
          console.log("consumer", consumer);

          stream.addTrack(consumer.track);
        }
      })
    );
  await Promise.all(consumePromises);
  if (stream.getTracks().length > 0) {
    return stream;
  }
  return null;
}
export {
  setupTransports,
  verifyUser,
  sendProducer,
  listenProducer,
  receiveConsumer,
  getStream,
  connectTransport,
  getRTPCapabilities,
  listenConsumer,
};
