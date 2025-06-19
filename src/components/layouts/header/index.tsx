"use client";
import React from "react";
import ThemeControl from "../theme";
import Image from "next/image";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { useActiveSection } from "~/hooks/useSession";
import Item from "./item";
export default function Header(): React.ReactNode {
  const idActive = useActiveSection(
    ["introduce", "about", "features", "plans", "contact"],
    "container"
  );
  const listItem: {
    label: string;
    hash: string;
    id: string;
    icon?: React.ReactNode;
  }[] = [
    {
      label: "Home",
      hash: "#introduce",
      id: "introduce",
      icon: <HiHome size={20} />,
    },
    { label: "Features", hash: "#features", id: "features" },
    { label: "About", hash: "#about", id: "about" },
    { label: "Plans", hash: "#plans", id: "plans" },
    { label: "Contact", hash: "#contact", id: "contact" },
  ];
  return (
    <header className="fixed w-full flex justify-center left-0 top-0 z-50">
      <div className="relative px-5 lg:px-10 py-5 flex items-center justify-center max-w-[1920px] w-full">
        <Link href="/" className="flex items-center gap-2 absolute left-10">
          <Image
            src={"/logo.svg"}
            alt="Dark Net Logo"
            width={50}
            height={50}
            priority
          />
          <label className="text-2xl text-secondary">Dark Net</label>
        </Link>
        <nav className="flex items-center gap-4 glass px-4 py-2 transition-all duration-400">
          {listItem.map((item, index) => (
            <Item key={index} {...item} active={item.id === idActive} />
          ))}
        </nav>
        <div className="absolute right-10">
          <ThemeControl />
        </div>
      </div>
    </header>
  );
}
