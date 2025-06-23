"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Page(): React.ReactNode {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (window.location.hash === "#_=_") {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);
  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Not logged in</p>;
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <p>Signed in as {session.user?.email}</p>
      <p>Name: {session.user?.name}</p>
      <Image
        src={session.user?.image || ""}
        width={100}
        height={100}
        alt="Profile picture"
        className="rounded-full"
      />
    </div>
  );
}
