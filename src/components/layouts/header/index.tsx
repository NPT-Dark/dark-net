import React from "react";
import ThemeControl from "../theme";
import Image from "next/image";

export default function Header(): React.ReactNode {
  return (
    <header className="w-full px-10 py-4 flex items-center justify-between fixed top-0 z-50 bg-third dark:bg-primary shadow-md">
      <div className="flex items-center gap-2">
        <Image
          src={"/logo.svg"}
          alt="Dark Net Logo"
          width={50}
          height={50}
          priority
        />
        <label className="text-3xl">Dark Net</label>
      </div>
      <div>
        <ThemeControl />
      </div>
    </header>
  );
}
