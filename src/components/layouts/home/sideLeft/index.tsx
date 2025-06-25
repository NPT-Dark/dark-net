"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import ThemeControl from "../../theme";
import { FaUserFriends } from "react-icons/fa";
import { SiYoutubegaming } from "react-icons/si";
import { MdLibraryMusic } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";

export default function SideLeft(): React.ReactNode {
  const { data } = useSession();
  const avatar = data?.user?.image || null;
  const name = data?.user?.name || null;
  return (
    <div className="h-full flex flex-col items-start min-w-[350px] max-w-[350px] w-full gap-3">
      <div className="w-full flex items-center justify-between gap-3 shadow-all p-5 rounded-md dark:shadow-none dark:border">
        <div className="flex items-center gap-3">
          <div className="relative size-10">
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
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-nowrap font-medium text-sm">{name}</p>
            <div className="text-green-500 text-sm flex items-center gap-1">
              <div className="bg-green-500 rounded-full size-[8px]" />
              Online
            </div>
          </div>
        </div>
        <ThemeControl />
      </div>
      <div className="w-full gap-2 shadow-all p-5 rounded-md flex flex-col dark:shadow-none dark:border">
        <div className="flex gap-1 items-center justify-stretch w-full p-2 border border-sixth rounded-lg focus:outline-none focus:border-secondary dark:border-secondary">
          <BiSearch className="text-sixth dark:text-secondary" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-sm flex-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">People you may know</p>
          {[0, 1, 2].map((_, index) => (
            <div
              className="w-full flex justify-between items-center gap-2 border p-2 shadow-sm shadow-gray-100 border-gray-100 rounded-lg dark:shadow-none dark:border dark:border-secondary"
              key={index}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="relative size-8">
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
                </div>
                <p className="text-nowrap font-medium text-sm">{name}</p>
              </div>
              <button className="text-[15px] bg-secondary rounded-lg h-fit p-1 text-white active:scale-95 transition-all duration-300">
                <IoPersonAdd />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full gap-5 shadow-all p-5 rounded-md flex flex-col dark:shadow-none dark:border">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserFriends className="text-red-500" size={20} />
          <p>Friends List</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <SiYoutubegaming className="text-blue-500" size={20} />
          <p>Gaming</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <MdLibraryMusic className="text-orange-500" size={20} />
          <p>Music</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaBookBookmark className="text-yellow-500" size={20} />
          <p>Bookmarks</p>
        </div>
      </div>
    </div>
  );
}
