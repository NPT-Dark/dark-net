"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
export default function Contact(): React.ReactNode {
  return (
    <section
      id="contact"
      className="h-screen w-full snap-start max-h-[1080px] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: 90 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center justify-center"
      >
        <h2 className="text-5xl mb-5">Contact Us</h2>
        <p>
          Have questions or need support? Feel free to reach out — we’re here to
          help.
        </p>
        <p>You can contact us through the following channels:</p>
        <div className="grid grid-cols-2 mt-5 gap-5">
          <Link
            href="tel:+84 034 8257 483"
            className="border border-sixth p-2 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition duration-300 ease-in-out dark:border-secondary"
          >
            <FaPhoneAlt size={20} />
            <p>Phone</p>
          </Link>
          <Link
            href="mailto:tainguyenIT2412000@gmail"
            className="border border-sixth p-2 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition duration-300 ease-in-out dark:border-secondary"
          >
            <MdEmail size={20} />
            <p>Email</p>
          </Link>
        </div>
        <div className="flex items-center w-full gap-2 my-2 max-w-[500px]">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          <span className="text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        </div>
        <p className="text-sm">
          You can also get quick help by chatting with our support team via the
          chat icon in the bottom right corner.
        </p>
      </motion.div>
    </section>
  );
}
