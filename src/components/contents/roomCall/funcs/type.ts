import { Socket } from "socket.io-client";
import * as mediasoupClient from "mediasoup-client";

type TransportType =
  mediasoupClient.types.Transport<mediasoupClient.types.AppData>;

type VerifyUserProps = {
  roomId: string;
  userId: string;
};

type SetUpTransportProps = {
  socket: Socket;
  roomId: string;
  userId: string;
};

type ListenProducerProps = {
  transport: TransportType;
  socket: Socket;
  roomId: string;
  userId: string;
};

type SendProducerProps = {
  transport: TransportType;
  track: MediaStreamTrack;
};

type ReceiveProducerProps = {
  socket: Socket;
  recvTransport: TransportType;
  producerId: string;
  rtpCapabilities: any;
  roomId: string;
  userId: string;
};

export type {
  TransportType,
  VerifyUserProps,
  SetUpTransportProps,
  ListenProducerProps,
  SendProducerProps,
  ReceiveProducerProps,
};
