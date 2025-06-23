import { motion } from "framer-motion";
import React, { useState } from "react";
import { PlanType } from ".";
import clsx from "clsx";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

export default function PlanResponsive({
  itemPlans,
}: {
  itemPlans: PlanType[];
}): React.ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  return (
    <div className="size-full flex flex-col gap-5 justify-center items-center max-lg:gap-3">
      <h2 className="text-5xl max-2sm:text-3xl">Our Plans</h2>
      <p className="text-sm max-w-1/2 text-center max-lg:max-w-full max-md:text-start max-2sm:hidden">
        We offer two simple plans to match your needs: a free Basic plan with
        all the essential social features, and a Premium plan that unlocks
        advanced AI support to enhance your chat, calls, and content creation.
      </p>
      <div className="grid grid-cols-1 gap-3 w-full max-w-[500px] max-[1600px]:max-w-2/3 max-lg:max-w-full">
        {itemPlans.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, x: index === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            key={index}
            className={clsx(
              "flex flex-col items-center border-2 rounded-lg p-5 w-full cursor-pointer max-lg:p-3 max-2sm:!p-2",
              {
                "border-secondary": index === 1,
                "border-fifth dark:border-gray-800": index === 0,
              }
            )}
            onClick={() => setOpenIndex(index)}
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center w-full">
                <h3 className="text-2xl font-bold max-lg:text-lg max-2sm:!text-base">
                  {item.title}
                </h3>
                <p className="text-lg max-lg:text-base max-lg:italic">
                  ({item.price})
                </p>
              </div>
              {openIndex === index ? (
                <RiArrowUpSFill size={30} />
              ) : (
                <RiArrowDownSFill size={30} />
              )}
            </div>
            <motion.ul
              initial={false}
              animate={
                openIndex === index
                  ? { height: "auto", opacity: 1, marginTop: 8 }
                  : { height: 0, opacity: 0, marginTop: 0 }
              }
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2 overflow-hidden w-full max-2sm:gap-0"
            >
              {item.features.map((feature, index) => (
                <li key={index}>
                  <p>
                    <span className="font-semibold max-lg:text-sm max-2sm:!text-[13px] max-2sm:underline">
                      {feature.name}
                    </span>
                    :{" "}
                    <span className="italic text-sm max-2sm:text-[13px]">
                      {feature.description}
                    </span>
                  </p>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
