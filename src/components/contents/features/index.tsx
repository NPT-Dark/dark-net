import React from "react";
import ListFeature from "./listFeature";
import { IoIosCall } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { IoPeopleCircleSharp } from "react-icons/io5";
import ListFeatureResponsive from "./listFeatureResponsive";
export default function Features(): React.ReactNode {
  const dataFeatures = [
    {
      title: "Online Call",
      description:
        "Seamless voice and video calls built into the platform. With AI assistance, summarize conversations, suggest responses, and stay focused on what matters.",
      icon: <IoIosCall />,
    },
    {
      title: "Security",
      description:
        "Your privacy is protected with advanced encryption and access control — plus AI-powered monitoring to detect unusual activity and keep you safe.",
      icon: <MdOutlineSecurity />,
    },
    {
      title: "AI Chat",
      description:
        "Experience smart conversations with AI that helps you reply faster, rephrase messages, translate languages, and understand context effortlessly.",
      icon: <RiRobot2Fill />,
    },
    {
      title: "Social",
      description:
        "Post updates, share media, and connect like any social platform — now enhanced by AI that helps you write, create, and engage more meaningfully.",
      icon: <IoPeopleCircleSharp />,
    },
  ];
  return (
    <section
      id="features"
      className="h-screen flex flex-col items-center justify-center w-full snap-start max-h-[1500px] gap-5 max-2sm:gap-3 max-sm:items-start"
    >
      <div className="flex flex-col items-center justify-center gap-5 max-md:items-start max-2sm:gap-3">
        <h2 className="text-5xl text-nowrap max-2sm:text-3xl">Our Features</h2>
        <label className="max-w-1/2 text-center text-sm max-lg:max-w-full max-md:text-start">
          {`Experience a new kind of social platform where AI enhances every interaction — from real-time chat and secure calls to smarter content creation and deeper connections. Designed to make your digital life faster, safer, and more intuitive.`}
        </label>
      </div>
      <div className="grid grid-cols-4 grid-rows-1 auto-rows-fr gap-5 place-items-center max-lg:grid-cols-2  max-lg:grid-rows-2 max-md:hidden">
        <ListFeature data={dataFeatures} />
      </div>
      <div className="hidden grid-cols-1 place-items-center max-md:grid w-full gap-1">
        <ListFeatureResponsive data={dataFeatures} />
      </div>
    </section>
  );
}
