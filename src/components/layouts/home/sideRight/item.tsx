import Image from "next/image";
import { BiPlusCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
const ItemGroup = ({
  key,
  IsCall,
  avatar,
}: {
  key: number;
  IsCall?: boolean;
  avatar?: string;
}) => (
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
const ItemChat = ({
  key,
  avatar,
  displayName,
  onClick,
}: {
  key: string;
  displayName?: string;
  avatar?: string;
  onClick: () => void;
}) => (
  <div
    key={key}
    className="flex items-center justify-between shadow-sm border shadow-gray-100 border-gray-100 rounded-lg p-2 dark:shadow-none dark:border-secondary cursor-pointer active:scale-95 transition-all duration-300"
    onClick={onClick}
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
          <p className="text-sm">{displayName || "No Name"}</p>
          <div className="italic text-[12px] text-green-500">Online</div>
        </div>
      </div>
    </div>
  </div>
);

export { ItemGroup, ItemChat };
