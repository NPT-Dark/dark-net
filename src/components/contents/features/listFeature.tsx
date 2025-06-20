"use client";
import React from "react";
import { motion } from "framer-motion";
export default function ListFeature({
  data,
}: {
  data: { title: string; description: string; icon: React.ReactNode }[];
}): React.ReactNode {
  return (
    <>
      {data.map((item, index) => (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          key={index}
          className="flex flex-col size-full gap-5 p-3 items-center justify-center border border-sixth shadow-lg rounded-xl dark:border-secondary hover:border-secondary cursor-pointer max-lg:gap-2"
        >
          <span className="text-[50px] max-lg:text-[30px]">{item.icon}</span>
          <h3 className="text-nowrap text-3xl max-lg:text-xl">{item.title}</h3>
          <label className="text-center max-lg:text-sm">
            {item.description}
          </label>
        </motion.div>
      ))}
    </>
  );
}
