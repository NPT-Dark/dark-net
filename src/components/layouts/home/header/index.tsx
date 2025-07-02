"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ImProfile } from "react-icons/im";
import { IoIosSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

export default function HeaderHome(): React.ReactNode {
  const { data } = useSession();
  const avatar = data?.user?.profileImage || null;
  const [open, setOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!avatarRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 z-50 mx-auto bg-white w-full max-w-[1920px] px-10 py-5 max-md:py-3 max-md:px-5 flex items-center justify-between shadow-lg shadow-fifth dark:shadow-md dark:shadow-[#36474769]">
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
            <div className="absolute -top-1 -right-1 bg-error rounded-full text-white p-1 size-[18px] flex items-center justify-center text-[10px]">
              3
            </div>
          </div>
          <div className="relative">
            <IoMdNotifications className="cursor-pointer text-3xl" />
            <div className="absolute -top-1 -right-1 bg-error rounded-full text-white p-1 size-[18px] flex items-center justify-center text-[10px]">
              3
            </div>
          </div>
          <div
            className="relative cursor-pointer flex items-center justify-center size-8 rounded-full border border-secondary"
            ref={avatarRef}
            onClick={() => setOpen(!open)}
          >
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
          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: -30 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.2 }}
                className="absolute right-[max(0px,calc((100vw-1920px)/2)+50px)] max-md:right-[max(0px,calc((100vw-1920px)/2)+25px)] top-full mt-2 w-40 rounded-lg bg-white shadow-lg border border-gray-200 z-50 overflow-hidden"
              >
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <ImProfile size={20} />
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <IoIosSettings size={20} />
                  Settings
                </li>
                <li
                  className="px-2 py-2 cursor-pointer bg-error mx-2 mb-2 text-white rounded-lg flex items-center gap-2"
                  onClick={() => signOut()}
                >
                  <IoIosLogOut size={20} />
                  Logout
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </header>
      <div className="w-full h-[100px] max-md:h-12" />
    </>
  );
}
