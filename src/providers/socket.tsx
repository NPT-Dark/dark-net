"use client";

import { io } from "socket.io-client";
import { useEffect } from "react";

export const socket = io({
  path: "/api/socketio",
  autoConnect: false,
});

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    fetch("/api/socket").finally(() => {
      if (!socket.connected) {
        socket.connect();
      }
      socket.on("connect", () => {
        console.log("🟢 Connected to socket:", socket.id);
      });
      socket.on("server-message", (msg) => {
        console.log("💬 From server:", msg);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
}
