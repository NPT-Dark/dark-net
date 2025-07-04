import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponseWithSocket } from "~/types/socket";
import { IMakeCallData } from "~/types/call";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  _: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    console.log("🟢 Socket.IO server is starting...");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const io = new Server(res.socket.server as any, {
      path: "/api/socketio",
    });
    io.on("connection", (socket) => {
      socket.on("join-my-room", (userId: string) => {
        console.log("🟢 User joined room:", userId);
        socket.join(userId);
      });
      socket.on("make-call", (data: IMakeCallData) => {
        socket.to(data.to).emit("incoming-call", {
          sender: data.from,
          signalData: data.signalData,
          callerInfo: data.callerInfo,
        });
      });
      socket.on("disconnect", () => {
        console.log("❌ Disconnected:", socket.id);
      });
    });
    res.socket.server.io = io;
  }

  res.end();
}
