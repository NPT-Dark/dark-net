import React from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import BannerIntro from "./banner";
import Link from "next/link";
import BannerIntroResponsive from "./bannerResponsive";
import { IoIosCall } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { IoPeopleCircleSharp } from "react-icons/io5";
export default function Introduce(): React.ReactNode {
  const listImage: { label: string; image: string; icon: React.ReactNode }[] = [
    {
      label: "Online Call",
      image: "banner-1.webp",
      icon: <IoIosCall size={20} />,
    },
    {
      label: "Security",
      image: "banner-2.webp",
      icon: <MdOutlineSecurity size={20} />,
    },
    {
      label: "AI Chat",
      image: "banner-3.webp",
      icon: <RiRobot2Fill size={20} />,
    },
    {
      label: "Social",
      image: "banner-4.webp",
      icon: <IoPeopleCircleSharp size={20} />,
    },
  ];
  return (
    <section
      id="introduce"
      className="flex w-full h-screen justify-stretch items-center max-h-[1500px] snap-start"
    >
      <div className="flex-1 flex flex-col gap-5 w-full max-2sm:gap-3">
        <div className="flex-1 flex flex-col gap-5 w-full max-w-[80%] mx-auto max-xl:max-w-full max-2sm:gap-3">
          <h1 className="text-4xl flex flex-col gap-3 max-[1500px]:text-2xl max-2sm:text-xl max-md:text-base">
            Transforming Communication with
            <label className="text-nowrap text-5xl max-2sm:text-3xl">
              AI-Powered Chat
            </label>
          </h1>
          <BannerIntroResponsive listImage={listImage} />
          <h2 className="max-[1500px]:text-base max-md:text-sm">
            {
              "With AI-powered chat, getting the answers you need has never been easier. Instantly understand questions, resolve issues, and keep conversations flowing — all without the wait or confusion. Whether you're chatting for support, learning, or fun, AI makes every interaction faster, smoother, and more intuitive."
            }
          </h2>
          <div className="flex items-center gap-6 max-md:gap-3">
            <Link
              href={"/sign-in"}
              className="flex items-center gap-3 bg-primary text-third p-2 rounded-full dark:bg-secondary dark:text-primary max-md:p-1 max-md:gap-1"
            >
              <label className="max-md:text-sm">Try Out</label>
              <div className="flex items-center justify-center bg-third text-primary rounded-full p-1 size-6 dark:bg-primary dark:text-secondary">
                <CiLocationArrow1 size={20} />
              </div>
            </Link>
            <Link
              href="#features"
              className="flex items-center gap-3 bg-fourth text-primary p-2 rounded-full dark:bg-transparent dark:text-secondary max-md:p-1 max-md:gap-1"
            >
              <label className="max-md:text-sm">Learn More</label>
              <div className="flex items-center justify-center bg-third text-primary rounded-full p-1 size-6 dark:bg-transparent dark:text-secondary">
                <CiLocationArrow1 size={20} />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <BannerIntro listImage={listImage} />
    </section>
  );
}
