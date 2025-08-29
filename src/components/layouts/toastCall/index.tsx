"use client";
import { Howl } from "howler";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { formatAvatar } from "~/components/ui/formatAvatar";
import { handleOpenWindowRoomCall } from "~/libs/openNewWindow";
import { socket } from "~/providers/socket";
import { RootState } from "~/store";
export type DataCallType = {
  callType: "audio" | "video";
  caller: string;
  receivers: string[];
  roomId: string;
};
export default function ToastCall(): React.ReactNode {
  const { infoCall } = useSelector((state: RootState) => state.roomCall);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const [dataCall, setDataCall] = useState<DataCallType>();
  const soundControl = useRef<Howl>(
    new Howl({
      src: ["/sounds/ringtone.mp3"],
      html5: true,
      volume: 0.3,
      loop: true,
    })
  );
  useEffect(() => {
    socket.on("incoming-call", (data: DataCallType) => {
      setIsShow(true);
      soundControl.current.play();
      setTimeout(() => {
        soundControl.current.stop();
        setIsTimeout(true);
      }, 20000);
      setDataCall(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  if (!isShow) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      {!isTimeout ? (
        <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-2xl shadow-2xl flex flex-col items-center gap-6 w-[90%] max-w-sm sm:max-w-md text-center">
          <div className="relative">
            <span className="absolute inset-0 rounded-full border-[6px] border-green-400 animate-ping"></span>
            <span className="absolute inset-2 rounded-full border-[6px] border-green-300 animate-ping delay-300"></span>
            <div className="relative z-10 size-24 sm:size-28 rounded-full overflow-hidden shadow-md">
              {formatAvatar({
                avatar: infoCall.callerInfo.profileImage,
                isFormatColor: true,
                isCustomSize: true,
              })}
            </div>
          </div>
          <div className="text-xl font-semibold dark:text-white animate-pulse">
            {infoCall.callerInfo.name} đang gọi cho bạn...
          </div>
          <div className="flex gap-6 mt-4">
            <button
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-md transition duration-300"
              onClick={() => {
                soundControl.current.stop();
                handleOpenWindowRoomCall({ code: dataCall?.roomId || "" });
                setIsShow(false);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.87 19.87 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a1 1 0 0 1 1 .75L11.7 8.4a1 1 0 0 1-.25 1L9.91 11a16 16 0 0 0 4.11 4.11l1.6-1.6a1 1 0 0 1 1-.25l4.65 1.61a1 1 0 0 1 .73 1z" />
              </svg>
            </button>
            <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full w-16 h-16 shadow-md transition duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Cuộc gọi sẽ tự huỷ sau 30 giây...
          </p>
        </div>
      ) : (
        <p className="text-white text-lg">
          Bạn đã bỏ lỡ cuộc gọi từ {infoCall.callerInfo.name}
        </p>
      )}
    </div>
  );
}
