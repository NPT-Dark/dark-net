import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "~/libs/auth";

export default async function Page(): Promise<React.ReactNode> {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p>Signed in as {session?.user?.email}</p>
      <p>Name: {session?.user?.name}</p>
      <Image
        src={session?.user?.image || ""}
        width={100}
        height={100}
        alt="Profile picture"
        className="rounded-full"
      />
    </div>
  );
}
