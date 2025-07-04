"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ToastContainer autoClose={3000} />
    </SessionProvider>
  );
}
