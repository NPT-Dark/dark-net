import React from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import BannerIntro from "./banner";
import Link from "next/link";
export default function Introduce(): React.ReactNode {
  return (
    <section
      id="introduce"
      className="flex w-full h-screen justify-stretch items-center max-h-[1080px] snap-start"
    >
      <div className="flex-1 flex flex-col gap-5 w-full">
        <div className="flex-1 flex flex-col gap-5 w-full max-w-[80%] mx-auto md:max-xl:max-w-full">
          <h1 className="text-4xl flex flex-col gap-3 max-[1500px]:text-2xl">
            Transforming Communication with
            <label className="text-nowrap text-5xl">AI-Powered Chat</label>
          </h1>
          <h2 className="max-[1500px]:text-base">
            {
              "With AI-powered chat, getting the answers you need has never been easier. Instantly understand questions, resolve issues, and keep conversations flowing — all without the wait or confusion. Whether you're chatting for support, learning, or fun, AI makes every interaction faster, smoother, and more intuitive."
            }
          </h2>
          <div className="flex items-center gap-6">
            <Link
              href={"/sign-in"}
              className="flex items-center gap-3 bg-primary text-third p-2 rounded-full dark:bg-secondary dark:text-primary"
            >
              <label>Try Out</label>
              <div className="flex items-center justify-center bg-third text-primary rounded-full p-1 size-6 dark:bg-primary dark:text-secondary">
                <CiLocationArrow1 size={20} />
              </div>
            </Link>
            <Link
              href="#features"
              className="flex items-center gap-3 bg-fourth text-primary p-2 rounded-full dark:bg-transparent dark:text-secondary"
            >
              <label>Learn More</label>
              <div className="flex items-center justify-center bg-third text-primary rounded-full p-1 size-6 dark:bg-transparent dark:text-secondary">
                <CiLocationArrow1 size={20} />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <BannerIntro />
    </section>
  );
}
