"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import SocketProvider from "~/providers/socket";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SocketProvider>{children}</SocketProvider>
      <ToastContainer autoClose={3000} />
    </SessionProvider>
  );
}
