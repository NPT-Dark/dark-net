"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
export default function ListFeatureResponsive({
  data,
}: {
  data: { title: string; description: string; icon: React.ReactNode }[];
}): React.ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <>
      {data.map((item, index) => (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          key={index}
          className="flex flex-col w-full p-3 border border-sixth shadow-lg rounded-xl dark:border-secondary hover:border-secondary cursor-pointer max-ssm:p-1 max-ssm:pl-2"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2 w-full">
              <span className="text-[20px]">{item.icon}</span>
              <h3 className="text-nowrap text-lg">{item.title}</h3>
            </div>
            {openIndex === index ? (
              <RiArrowUpSFill size={30} />
            ) : (
              <RiArrowDownSFill size={30} />
            )}
          </div>
          <motion.div
            initial={false}
            animate={
              openIndex === index
                ? { height: "auto", opacity: 1, marginTop: 4 }
                : { height: 0, opacity: 0, marginTop: 0 }
            }
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <label className="text-sm block">{item.description}</label>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
