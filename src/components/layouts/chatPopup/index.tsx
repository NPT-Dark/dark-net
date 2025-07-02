"use client";
import { socket } from "~/providers/socket";
import React from "react";
import { BiMinus } from "react-icons/bi";
import { IoCall, IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { formatAvatar } from "~/components/ui/formatAvatar";
import { toastError } from "~/components/ui/toastGlobal";
import { getDataCall } from "~/funcs/webRTC";
import { RootState } from "~/store";

export default function ChatPopup(): React.ReactNode {
  const { listChat } = useSelector((state: RootState) => state.chatPopup);
  if (listChat.length === 0) return null;
  async function handleCall(id: string) {
    const dataCall = await getDataCall();
    if (!dataCall) {
      return toastError({
        message: "Your device not found!",
      });
    }
    const { stream, pc, ice } = dataCall;
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("call", {
      userId: id,
      ice: dataCall.ice,
      sdp: dataCall.pc.localDescription,
    });
  }
  return (
    <div className="fixed bottom-0 right-20 flex items-center">
      {listChat.map((item) => (
        <div
          key={item._id}
          className="w-[400px] h-[600px] bg-white shadow-all rounded-lg dark:shadow-none dark:border dark:border-secondary overflow-hidden"
        >
          <div className="flex items-center justify-between px-3 py-2 bg-secondary">
            <div className="flex items-center gap-2 text-white">
              {formatAvatar(item.profileImage, true)}
              <div className="flex flex-col">
                <span>{item.displayName}</span>
                <span className="text-[12px] italic">Online</span>
              </div>
            </div>
            <div className="text-white flex items-center gap-2">
              <IoCall
                className="cursor-pointer hover:scale-110 transition-all duration-200"
                size={20}
                onClick={() => handleCall(item._id)}
              />
              <BiMinus
                className="cursor-pointer hover:scale-110 transition-all duration-200"
                size={20}
              />
              <IoClose
                className="cursor-pointer hover:scale-110 transition-all duration-200"
                size={25}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
