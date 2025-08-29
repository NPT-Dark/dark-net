"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3333";

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session && !socket.connected) {
      socket.connect();
      socket.emit("register", session.user?.id);
    }
    return () => {
      socket.disconnect();
    };
  }, [session]);

  return <>{children}</>;
}
