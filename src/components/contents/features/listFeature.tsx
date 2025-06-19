"use client";
import React from "react";
import { motion } from "framer-motion";
import { IoIosCall } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { IoPeopleCircleSharp } from "react-icons/io5";
export default function ListFeature(): React.ReactNode {
  const dataFeatures = [
    {
      title: "Online Call",
      description:
        "Seamless voice and video calls built into the platform. With AI assistance, summarize conversations, suggest responses, and stay focused on what matters.",
      icon: <IoIosCall size={50} />,
    },
    {
      title: "Security",
      description:
        "Your privacy is protected with advanced encryption and access control — plus AI-powered monitoring to detect unusual activity and keep you safe.",
      icon: <MdOutlineSecurity size={50} />,
    },
    {
      title: "AI Chat",
      description:
        "Experience smart conversations with AI that helps you reply faster, rephrase messages, translate languages, and understand context effortlessly.",
      icon: <RiRobot2Fill size={50} />,
    },
    {
      title: "Social",
      description:
        "Post updates, share media, and connect like any social platform — now enhanced by AI that helps you write, create, and engage more meaningfully.",
      icon: <IoPeopleCircleSharp size={50} />,
    },
  ];
  return (
    <>
      {dataFeatures.map((item, index) => (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          key={index}
          className="flex flex-col size-full gap-5 p-3 items-center justify-center border border-sixth shadow-lg rounded-xl dark:border-secondary hover:border-secondary cursor-pointer"
        >
          {item.icon}
          <h3 className="text-nowrap text-3xl">{item.title}</h3>
          <label className="text-center">{item.description}</label>
        </motion.div>
      ))}
    </>
  );
}
