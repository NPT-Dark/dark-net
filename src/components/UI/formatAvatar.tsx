import clsx from "clsx";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

export const formatAvatar = (props?: {
  avatar?: string | null;
  isChat?: boolean;
  isFormatColor?: boolean;
  isSize?: 8 | 10;
  isCustomSize?: boolean;
}): React.ReactNode => {
  const {
    avatar = null,
    isChat = false,
    isFormatColor = false,
    isSize = 8,
    isCustomSize,
  } = props || {};
  return (
    <div
      className={clsx(
        "relative cursor-pointer flex items-center justify-center rounded-full border",
        {
          "border-white": isChat,
          "border-secondary": !isChat,
          "size-8": !isSize || isSize === 8,
          "size-10": isSize === 10,
          "size-full p-10": isCustomSize,
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
        <FaUser
          className={clsx("", {
            "text-secondary": isFormatColor,
            "text-xl": !isCustomSize,
            "size-full": isCustomSize,
          })}
        />
      )}
      {isChat ? (
        <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
      ) : null}
    </div>
  );
};
