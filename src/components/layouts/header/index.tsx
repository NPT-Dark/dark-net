"use client";
import React from "react";
import ThemeControl from "../theme";
import Image from "next/image";
import Link from "next/link";
import { useActiveSection } from "~/hooks/useSession";
import Item from "./item";
import { usePathname } from "next/navigation";
import { FaSignInAlt } from "react-icons/fa";
import { listItem } from "./header.data";
export default function Header(): React.ReactNode {
  const pathName = usePathname();
  const idActive = useActiveSection(
    ["introduce", "about", "features", "plans", "contact"],
    "container",
    pathName
  );
  if (pathName === "/home" || pathName.includes("/room-call")) return null;
  return (
    <>
      <header className="fixed w-full flex justify-center left-0 top-0 z-50 h-[98px] max-2md:h-auto">
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
              className="max-md:size-7"
            />
            <label className="text-2xl text-secondary max-md:text-base">
              Dark Net
            </label>
          </Link>
          {pathName === "/" ? (
            <nav className="flex items-center gap-4 glass px-4 py-2 transition-all duration-400 max-2md:hidden">
              {listItem.map((item, index) => (
                <Item key={index} {...item} active={item.id === idActive} />
              ))}
            </nav>
          ) : null}
          <div className="absolute right-10 flex items-center gap-5 max-2md:right-0 max-2md:relative max-md:gap-1">
            {pathName === "/" ? (
              <Link
                href={"/sign-in"}
                className={
                  "flex items-center gap-1 bg-primary text-third p-1 rounded-full dark:bg-secondary dark:text-primary max-sm:px-2"
                }
              >
                <label className="max-md:text-[10px]">Try Out</label>
                <div className="flex items-center justify-center bg-third text-primary rounded-full p-1 size-5 dark:bg-primary dark:text-secondary max-sm:hidden">
                  <FaSignInAlt className="text-lg max-md:text-sm" />
                </div>
              </Link>
            ) : null}
            <ThemeControl />
          </div>
        </div>
      </header>
      {pathName === "/" ? (
        <nav className="bottom-0 right-0 z-10 w-full glass !rounded-t-2xl !rounded-b-none px-4 py-1 transition-all duration-400 hidden max-2md:block fixed overflow-x-hidden">
          <div className="w-full flex items-center justify-between gap-1 overflow-x-auto">
            {listItem.map((item, index) => (
              <Item key={index} {...item} active={item.id === idActive} />
            ))}
          </div>
        </nav>
      ) : null}
    </>
  );
}
