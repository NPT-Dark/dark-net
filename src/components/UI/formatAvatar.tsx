import clsx from "clsx";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

export const formatAvatar = (
  avatar: string | undefined,
  isChat?: boolean
): React.ReactNode => {
  return (
    <div
      className={clsx(
        "relative cursor-pointer flex items-center justify-center size-8 rounded-full border",
        {
          "border-white": isChat,
          "border-secondary": !isChat,
        }
      )}
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
      {isChat ? (
        <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
      ) : null}
    </div>
  );
};
