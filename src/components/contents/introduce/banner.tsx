"use client";
import { motion } from "framer-motion";
import Image from "next/image";
export default function BannerIntro({
  listImage,
}: {
  listImage: { label: string; image: string }[];
}): React.ReactNode {
  return (
    <div className="flex-1 w-full justify-center hidden lg:flex">
      <div className="h-full w-2/3 grid grid-cols-2 grid-rows-2 gap-4 aspect-square">
        {listImage.map((item, index) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.02, 1] }}
            transition={{
              delay: index * 0.2,
              duration: 0.7,
              times: [0, 0.7, 1],
              ease: "easeInOut",
            }}
            key={index}
            className="p-4 rounded-2xl aspect-square relative shadow-lg"
          >
            <div className="absolute z-10 w-full flex items-center justify-center left-0 top-2">
              <label className="w-full z-10 mx-1 flex items-center justify-center left-0 bg-third dark:bg-primary py-1 text-lg font-semibold rounded-xl">
                {item.label}
              </label>
            </div>
            <Image
              src={`/images/banner-intro/${item.image}`}
              fill
              sizes="100%"
              alt={item.label}
              className="size-full object-cover rounded-2xl"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
