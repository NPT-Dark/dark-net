import { Socket } from "socket.io-client";

type EmitWithAckResponse<T> = {
  data?: T;
  error?: string;
};

export function emitWithAck(socket: Socket) {
  return function emitWithAck<T = any>(
    eventName: string,
    payload?: any
  ): Promise<EmitWithAckResponse<T>> {
    return new Promise((resolve) => {
      socket.emit(eventName, payload, (res: any) => {
        if (res?.error) {
          resolve({ error: res.error });
        } else {
          resolve({ data: res as T });
        }
      });
    });
  };
}
