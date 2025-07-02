import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponseWithSocket } from "~/types/socket";

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
      console.log("✅ Client connected:", socket.id);

      socket.on("client-message", (msg) => {
        console.log("📨 Received:", msg);
        io.emit("server-message", `🪄 Echo: ${msg}`);
      });

      socket.on("disconnect", () => {
        console.log("❌ Disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
