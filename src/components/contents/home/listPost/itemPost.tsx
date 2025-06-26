import Image from "next/image";
import React from "react";
import { formatTimeString } from "~/libs/formatTimeString";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import ReactionBar from "./reactionBar";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ImageLayout from "../imageLayout";
export type ItemPostType = {
  user: {
    img: string;
    name: string;
  };
  content?: string;
  img: string[];
  timePost: string;
};
export default function ItemPost({
  user,
  content,
  img,
  timePost,
}: ItemPostType): React.ReactNode {
  const reactions = [
    { name: "Like", src: "/icons/like.png" },
    { name: "Love", src: "/icons/heart.png" },
    { name: "Haha", src: "/icons/haha.png" },
    { name: "Wow", src: "/icons/surprised.png" },
    { name: "Sad", src: "/icons/sad.png" },
    { name: "Angry", src: "/icons/angry.png" },
  ];
  return (
    <div className="shadow-all relative w-full rounded-lg dark:shadow-none dark:border dark:border-secondary p-3 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Image
          src={user.img}
          width={50}
          height={50}
          className="rounded-full object-cover size-10"
          alt=""
        />
        <div className="flex flex-col gap-1">
          <p>{user.name}</p>
          <p className="text-gray-500 italic text-sm">
            {formatTimeString(timePost)}
          </p>
        </div>
      </div>
      {content && content !== "" ? <p className="text-sm">{content}</p> : null}
      {img ? <ImageLayout images={img} /> : null}
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2 my-2">
          <div className="flex items-start">
            {reactions.map((r) => (
              <Image
                key={r.name}
                src={r.src}
                alt={r.name}
                width={20}
                height={20}
                className="border border-white rounded-full object-cover"
              />
            ))}
            <p className="text-sm ml-2">3,6k</p>
          </div>
          <div className="text-sm flex items-center gap-1">
            <p>63</p>
            <p> Comments</p>
          </div>
        </div>
        <div className="grid grid-cols-3 w-full place-items-center">
          <ReactionBar />
          <div className="flex items-center gap-1 hover:bg-gray-100 w-full justify-center p-2 rounded-md cursor-pointer transition-all duration-300 text-xl">
            <FaComment />
            <p className="text-base">Comment</p>
          </div>
          <div className="flex items-center gap-1 hover:bg-gray-100 w-full justify-center p-2 rounded-md cursor-pointer transition-all duration-300 text-xl">
            <FaShare />
            <p className="text-base">Share</p>
          </div>
        </div>
      </div>
      <div className="absolute top-3 right-3 hover:bg-gray-50 p-2 rounded-full cursor-pointer">
        <HiOutlineDotsVertical className="size-5" />
      </div>
    </div>
  );
}
