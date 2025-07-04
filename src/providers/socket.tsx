"use client";

import { io } from "socket.io-client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export const socket = io({
  path: "/api/socketio",
  autoConnect: false,
});

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useSession();
  useEffect(() => {
    if (data) {
      fetch("/api/socket").finally(() => {
        if (!socket.connected) {
          socket.connect();
        }
        console.log(data);

        socket.on("connect", () => {
          console.log("🟢 Connected to socket:", socket.id);
          socket.emit("join-my-room", data?.user.id);
        });
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [data]);

  return <>{children}</>;
}
