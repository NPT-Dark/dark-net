"use client";
import React from "react";
import ThemeControl from "../theme";
import Image from "next/image";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { useActiveSection } from "~/hooks/useSession";
import Item from "./item";
import { usePathname } from "next/navigation";
import { FaSignInAlt } from "react-icons/fa";
import clsx from "clsx";
export default function Header(): React.ReactNode {
  const pathName = usePathname();
  const idActive = useActiveSection(
    ["introduce", "about", "features", "plans", "contact"],
    "container",
    pathName
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
    <>
      <header className="fixed w-full flex justify-center left-0 top-0 z-50">
        <div className="relative px-10 py-5 flex items-center justify-center max-w-[1920px] w-full max-md:py-3 max-md:px-5 max-2md:justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 absolute left-10 max-2md:left-0 max-2md:relative max-md:gap-1"
          >
            <Image
              src={"/logo.svg"}
              alt="Dark Net Logo"
              width={50}
              height={50}
              priority
              className="max-md:size-7"
            />
            <label className="text-2xl text-secondary max-md:text-base">
              Dark Net
            </label>
          </Link>
          <nav className="flex items-center gap-4 glass px-4 py-2 transition-all duration-400 max-2md:hidden">
            {listItem.map((item, index) => (
              <Item key={index} {...item} active={item.id === idActive} />
            ))}
          </nav>
          <div className="absolute right-10 flex items-center gap-5 max-2md:right-0 max-2md:relative max-md:gap-1">
            <Link
              href={"/sign-in"}
              className={clsx(
                "flex items-center gap-1 bg-primary text-third p-1 rounded-full dark:bg-secondary dark:text-primary ",
                {
                  hidden: pathName !== "/",
                }
              )}
            >
              <label className="max-md:text-[10px]">Try Out</label>
              <div className="flex items-center justify-center bg-third text-primary rounded-full p-1 size-5 dark:bg-primary dark:text-secondary">
                <FaSignInAlt className="text-lg max-md:text-sm" />
              </div>
            </Link>
            <ThemeControl />
          </div>
        </div>
      </header>
      <nav className="bottom-0 right-0 z-10 w-full glass !rounded-t-2xl !rounded-b-none px-4 py-1 transition-all duration-400 hidden max-2md:block fixed overflow-x-hidden">
        <div className="w-full flex items-center justify-between gap-1 overflow-x-auto">
          {listItem.map((item, index) => (
            <Item key={index} {...item} active={item.id === idActive} />
          ))}
        </div>
      </nav>
    </>
  );
}
