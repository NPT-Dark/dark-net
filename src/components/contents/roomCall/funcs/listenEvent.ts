import { Socket } from "socket.io-client";
import { TransportType } from "./type";
import { receiveConsumer } from "./services";
import * as mediasoupClient from "mediasoup-client";
export type Producer = mediasoupClient.types.Producer;
export default function listenEvent({
  receiver,
  userId,
  socket,
  params,
  setReceiverVideo,
  rtpCapabilities,
}: {
  receiver: TransportType | null;
  userId?: string;
  socket: Socket;
  params: Promise<{ code: string }>;
  setReceiverVideo: React.Dispatch<React.SetStateAction<MediaStream[]>>;
  rtpCapabilities: any;
}) {
  if (!socket || !userId) return;
  socket.on("new-producer", async (producers: Producer[]) => {
    const { code } = await params;
    if (producers && receiver && code) {
      const stream: MediaStream = new MediaStream();

      // Chạy song song và đợi hết
      const consumerTracks = await Promise.all(
        producers.map(async (data) => {
          const consumer = await receiveConsumer({
            socket,
            recvTransport: receiver,
            producerId: data.id,
            rtpCapabilities: rtpCapabilities,
            roomId: code,
            userId: userId,
          });
          if (consumer) {
            console.log("consumer", consumer);
            console.log("consumer track", consumer.track);
            return consumer.track;
          }
          return null;
        })
      );

      // Add tất cả track hợp lệ
      for (const track of consumerTracks) {
        if (track) stream.addTrack(track);
      }

      console.log("✅ Final stream with tracks:", stream.getTracks());
      setReceiverVideo((prev) => [...prev, stream]);
    }
  });
}
