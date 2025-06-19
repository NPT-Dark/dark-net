import React from "react";
import ListFeature from "./listFeature";
export default function Features(): React.ReactNode {
  return (
    <section
      id="features"
      className="h-screen flex flex-col items-center justify-center w-full snap-start max-h-[1080px] gap-5"
    >
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-5xl text-nowrap">Our Features</h2>
        <label className="max-w-1/2 text-center text-sm">
          {`Experience a new kind of social platform where AI enhances every interaction — from real-time chat and secure calls to smarter content creation and deeper connections. Designed to make your digital life faster, safer, and more intuitive.`}
        </label>
      </div>
      <div className="grid grid-cols-4 grid-rows-1 auto-rows-fr gap-5 place-items-center">
        <ListFeature />
      </div>
    </section>
  );
}
