"use client";
import { motion } from "framer-motion";
import React from "react";

export default function About(): React.ReactNode {
  return (
    <section
      id="about"
      className="h-screen flex flex-col items-center gap-5 justify-center w-full snap-start max-h-[1500px] max-2sm:gap-3 max-md:items-start"
    >
      <h2 className="text-nowrap text-5xl max-2sm:text-3xl">About Us</h2>
      <motion.p
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        className="leading-relaxed max-w-1/2 text-center max-lg:max-w-full max-md:text-sm max-md:text-start"
      >
        {`We’re reimagining the way people communicate — with the intelligence of AI
      at the core. Our chat system combines advanced natural language processing
      and real-time response generation to deliver conversations that feel
      effortless and natural. Behind the scenes, powerful AI models work
      instantly to understand your intent, provide accurate answers, and keep
      the conversation flowing smoothly. Whether you're solving a problem,
      exploring an idea, or just looking for a quick chat, our technology adapts
      to your needs — making every interaction smarter, faster, and more human.
      Built for scale, designed for simplicity, and always ready to talk — this
      is the future of communication, made for everyone.`}
      </motion.p>
      <label className="italic max-2sm:text-sm">Built by Dark team</label>
    </section>
  );
}
