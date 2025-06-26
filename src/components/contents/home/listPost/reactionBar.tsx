"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";

const reactions = [
  { name: "Like", src: "/icons/like.png" },
  { name: "Love", src: "/icons/heart.png" },
  { name: "Haha", src: "/icons/haha.png" },
  { name: "Wow", src: "/icons/surprised.png" },
  { name: "Sad", src: "/icons/sad.png" },
  { name: "Angry", src: "/icons/angry.png" },
];

export default function ReactionBar() {
  const [showReactions, setShowReactions] = useState<boolean>(false);
  return (
    <div
      className="relative flex gap-1 items-center hover:bg-gray-100 w-full justify-center p-2 rounded-md cursor-pointer transition-all duration-300 text-xl"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <AnimatePresence>
        {showReactions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.3,
            }}
            className="absolute -top-11 bg-white w-full left-1/2 -translate-x-1/2 px-3 py-2 rounded-xl shadow-lg flex gap-2 z-50"
          >
            {reactions.map((r) => (
              <motion.div
                key={r.name}
                whileHover={{ scale: 1.4 }}
                className="cursor-pointer"
              >
                <Image src={r.src} alt={r.name} width={40} height={40} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <AiFillLike />
      <p className="text-base">Like</p>
    </div>
  );
}
