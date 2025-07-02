"use client";
import { motion } from "framer-motion";
import { dataCoreValue } from "./introduce.data";
export default function BannerIntroResponsive(): React.ReactNode {
  return (
    <div className="w-full flex lg:hidden">
      <div className="grid grid-cols-4 grid-rows-1 gap-4">
        {dataCoreValue.map((item, index) => (
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
            className="px-2 py-1 rounded-2xl relative shadow-lg border border-primary dark:border-secondary max-2sm:p-1"
          >
            <label className="w-full flex justify-center py-1 text-lg font-semibold rounded-xl text-nowrap max-2sm:hidden">
              {item.label}
            </label>
            <span className="hidden max-2sm:block">
              {<item.icon size={20} />}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
