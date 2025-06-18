import React from "react";
import ThemeControl from "../theme";
import Image from "next/image";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import clsx from "clsx";
export default function Header(): React.ReactNode {
  const classItem =
    "border border-transparent rounded-md transition-all duration-400 hover:border-gray-300 hover:bg-white px-1 dark:hover:bg-fifth dark:hover:border-gray-600";
  return (
    <header className="fixed w-full flex justify-center left-0 top-0 z-50">
      <div className="relative px-5 lg:px-10 py-5 flex items-center justify-center max-w-[1920px] w-full">
        <div className="flex items-center gap-2 absolute left-10">
          <Image
            src={"/logo.svg"}
            alt="Dark Net Logo"
            width={50}
            height={50}
            priority
          />
          <label className="text-2xl text-secondary">Dark Net</label>
        </div>
        <nav className="flex items-center gap-4 glass px-4 py-2 transition-all duration-400">
          <Link href="/" className={clsx("flex items-start gap-1", classItem)}>
            <HiHome size={20} />
            <label>Home</label>
          </Link>
          <Link href="/about" className={classItem}>
            About
          </Link>
          <Link href="/contact" className={classItem}>
            Benefits
          </Link>
          <Link href="/contact" className={classItem}>
            Features
          </Link>
          <Link href="/contact" className={classItem}>
            Plans
          </Link>
        </nav>
        <div className="absolute right-10">
          <ThemeControl />
        </div>
      </div>
    </header>
  );
}
