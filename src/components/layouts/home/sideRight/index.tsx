"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
// import DropdownRadio from "./dropdown";
import { BiSolidContact } from "react-icons/bi";
import { SideRightType } from "~/types/home";

export default function SideRight(): React.ReactNode {
  const { data } = useSession();
  const [selectedType] = useState<SideRightType>(SideRightType.CHAT);
  const avatar = data?.user?.image || null;
  const ItemGroup = ({ key, IsCall }: { key: number; IsCall?: boolean }) => (
    <div
      key={key}
      className="flex items-center justify-between shadow-sm border shadow-gray-100 border-gray-100 rounded-lg p-2"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <TiGroup size={30} className="text-secondary" />
          <div className="flex flex-col gap-1">
            <p className="text-sm">Nhóm 3 con mèo</p>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3].map((item, index) => (
                <div key={index} className="relative size-3">
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
              ))}
            </div>
          </div>
        </div>
      </div>
      {IsCall ? (
        <button className="bg-secondary text-white rounded-lg p-1 h-fit text-[12px] flex items-center gap-1">
          <BiPlusCircle size={18} />
          Join
        </button>
      ) : null}
    </div>
  );
  const ItemChat = ({ key }: { key: number }) => (
    <div
      key={key}
      className="flex items-center justify-between shadow-sm border shadow-gray-100 border-gray-100 rounded-lg p-2 dark:shadow-none dark:border-secondary"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
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
          <div className="flex flex-col gap-1">
            <p className="text-sm">Lê Quang Bảo</p>
            <div className="italic text-[12px] text-green-500">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="h-full flex flex-col shadow-all pb-5 overflow-hidden rounded-md items-start min-w-[350px] max-w-[350px] w-full gap-3 min-h-2/3 max-h-[calc(100vh-150px)] dark:shadow-none dark:border">
      <div className="w-full h-full flex flex-col items-stretch justify-stretch gap-3">
        <div className="w-full flex items-center justify-between cursor-pointer pt-5 px-5">
          <div className="flex items-center gap-2">
            <BiSolidContact size={30} className="text-secondary" />
            Contacts
          </div>
          {/* <DropdownRadio /> */}
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto custom-scroll w-full">
          <div className="w-full flex flex-col gap-3 px-5">
            {selectedType === SideRightType.CHAT
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, key) =>
                  ItemChat({ key: key })
                )
              : null}
            {selectedType === SideRightType.GROUP
              ? [1, 2, 3].map((_, key) =>
                  ItemGroup({
                    key: key,
                  })
                )
              : null}
            {selectedType === SideRightType.RELATED_CALL
              ? [1, 2, 3].map((_, key) =>
                  ItemGroup({
                    key: key,
                    IsCall: true,
                  })
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
