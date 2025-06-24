"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

export default function HeaderHome(): React.ReactNode {
  const { data } = useSession();
  const avatar = data?.user?.image || null;
  return (
    <>
      <header className="fixed top-0 z-50 mx-auto w-full max-w-[1920px] px-10 py-5 max-md:py-3 max-md:px-5 flex items-center justify-between shadow-lg shadow-fifth dark:shadow-md dark:shadow-[#36474769]">
        <Link href={"/home"} className="flex items-center gap-2">
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
        <div className="text-secondary flex items-center gap-5">
          <div className="relative">
            <BiSolidMessageSquareDetail className="cursor-pointer text-3xl" />
            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full text-white p-1 size-[18px] flex items-center justify-center text-[10px]">
              3
            </div>
          </div>
          <div className="relative">
            <IoMdNotifications className="cursor-pointer text-3xl" />
            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full text-white p-1 size-[18px] flex items-center justify-center text-[10px]">
              3
            </div>
          </div>
          <div className="relative cursor-pointer flex items-center justify-center size-8 rounded-full border border-secondary">
            {avatar ? (
              <Image
                src={avatar}
                alt="Profile picture"
                fill
                sizes="100%"
                className="rounded-full"
              />
            ) : (
              <FaUser className="text-xl" />
            )}
            <nav className="absolute size-2 border-white border bottom-0 right-[2px] bg-primary rounded-full flex items-center justify-center">
              <FaAngleDown size={8} />
            </nav>
          </div>
        </div>
      </header>
      <div className="w-full h-[100px] max-md:h-12" />
    </>
  );
}
