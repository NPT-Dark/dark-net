"use client";
import React from "react";
import { BiMinus } from "react-icons/bi";
import { IoCall, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { formatAvatar } from "~/components/ui/formatAvatar";
import { RootState } from "~/store";
import { removeChatPopup } from "~/store/slices/chatPopup";
import { handleCall } from "./func";
import { useSession } from "next-auth/react";

export default function ChatPopup(): React.ReactNode {
  const { listChat } = useSelector((state: RootState) => state.chatPopup);
  const { data: session } = useSession();
  const dispath = useDispatch();
  if (listChat.length === 0) return null;
  return (
    <div className="fixed bottom-0 right-20 flex items-center">
      {listChat.map((item) => (
        <div
          key={item._id}
          className="w-[400px] h-[600px] bg-white shadow-all rounded-lg dark:shadow-none dark:border dark:border-secondary overflow-hidden"
        >
          <div className="flex items-center justify-between px-3 py-2 bg-secondary">
            <div className="flex items-center gap-2 text-white">
              {formatAvatar({
                avatar: item.profileImage,
                isChat: true,
              })}
              <div className="flex flex-col">
                <span>{item.displayName}</span>
                <span className="text-[12px] italic">Online</span>
              </div>
            </div>
            <div className="text-white flex items-center gap-2">
              <IoCall
                className="cursor-pointer hover:scale-110 transition-all duration-200"
                size={20}
                onClick={async () => {
                  await handleCall({
                    id: item._id,
                    session,
                  });
                }}
              />
              <BiMinus
                className="cursor-pointer hover:scale-110 transition-all duration-200"
                size={20}
              />
              <IoClose
                className="cursor-pointer hover:scale-110 transition-all duration-200"
                size={25}
                onClick={() => {
                  dispath(removeChatPopup(item._id));
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
