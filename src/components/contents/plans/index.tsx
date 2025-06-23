"use client";
import React from "react";
import { motion } from "framer-motion";
import { BsChatRightTextFill } from "react-icons/bs";
import { MdVideoCall } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import clsx from "clsx";
import PlanResponsive from "./planResponsive";
type Feature = {
  name: string;
  description: string;
  icon: React.ReactNode;
};

export type PlanType = {
  title: string;
  price: string;
  features: Feature[];
};
export default function Plans(): React.ReactNode {
  const itemPlans: PlanType[] = [
    {
      title: "Basic",
      price: "Free",
      features: [
        {
          name: "Standard Chat & Posts",
          description:
            "Text chat, post creation, and interactions like any typical social platform.",
          icon: <BsChatRightTextFill className="size-full" />,
        },
        {
          name: "Video Call",
          description:
            "Make secure and stable video calls with friends and contacts.",
          icon: <MdVideoCall className="size-full" />,
        },
        {
          name: "Security",
          description:
            "Basic data protection and privacy features to keep your account safe.",
          icon: <MdOutlineSecurity className="size-full" />,
        },
        {
          name: "Chat With AI (Basic)",
          description:
            "Talk with a basic AI bot for simple responses and general support.",
          icon: <BsRobot className="size-full" />,
        },
        {
          name: "AI Support Agent",
          description:
            "AI helps handle general support requests with limited understanding.",
          icon: <MdSupportAgent className="size-full" />,
        },
      ],
    },
    {
      title: "Premium",
      price: "$3/month",
      features: [
        {
          name: "Advanced AI Chat & Posts",
          description:
            "Get AI suggestions when chatting or creating posts — smarter, faster, more relevant.",
          icon: <BsChatRightTextFill className="size-full" />,
        },
        {
          name: "Smart Video Call",
          description:
            "AI-assisted call features like live transcription, auto-summarization, and smart reactions.",
          icon: <MdVideoCall className="size-full" />,
        },
        {
          name: "Enhanced Security",
          description:
            "Advanced protection with AI monitoring for unusual activity and real-time alerts.",
          icon: <MdOutlineSecurity className="size-full" />,
        },
        {
          name: "Chat With AI (Premium)",
          description:
            "Access a more advanced AI with better context, deeper answers, and natural conversation.",
          icon: <BsRobot className="size-full" />,
        },
        {
          name: "AI Support Agent",
          description:
            "AI delivers fast, intelligent responses with personalized support and guidance.",
          icon: <MdSupportAgent className="size-full" />,
        },
      ],
    },
  ];

  return (
    <section id="plans" className="h-screen w-full snap-start max-h-[1500px]">
      <div className="size-full flex flex-col gap-5 justify-center items-center max-[1600px]:hidden">
        <h2 className="text-5xl">Our Plans</h2>
        <p className="text-sm max-w-1/2 text-center">
          We offer two simple plans to match your needs: a free Basic plan with
          all the essential social features, and a Premium plan that unlocks
          advanced AI support to enhance your chat, calls, and content creation.
        </p>
        <div className="grid grid-cols-2 auto-rows-fr gap-10">
          {itemPlans.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: index === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              key={index}
              className={clsx(
                "flex flex-col items-center border rounded-lg shadow-lg p-5 gap-3 max-w-[500px] cursor-pointer",
                {
                  "border-secondary shadow-secondary": index === 1,
                  "border-sixth dark:border-gray-800": index === 0,
                }
              )}
            >
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-lg">{item.price}</p>
              <ul className="flex flex-col gap-4">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="size-6">{feature.icon}</span>
                      {feature.name}
                    </div>
                    <p className="italic text-sm">{feature.description}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="hidden size-full max-[1600px]:block">
        <PlanResponsive itemPlans={itemPlans} />
      </div>
    </section>
  );
}
