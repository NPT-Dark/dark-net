"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { IoCloseCircle } from "react-icons/io5";
import { addReviewImg } from "~/store/slices/reviewImgSlice";

export default function ReviewImg(): React.ReactNode {
  const dispatch = useDispatch();
  const { urls, active } = useSelector(
    (state: RootState) => state.reviewImg.reviewData
  );
  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <Image
            width={500}
            height={300}
            src={urls[i]}
            alt=""
            className="w-[100px] h-[50px] object-contain bg-[#fbfdfc] p-1 rounded-lg thumb-img"
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    initialSlide: active,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  if (urls.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grid h-screen w-screen fixed z-[100] top-0 left-0 bg-gray-500/50"
    >
      {urls.length > 1 ? (
        <div className="relative my-auto slider-container max-w-screen">
          <Slider className="w-full slider-review" {...settings}>
            {urls.map((image, index) => (
              <div key={index}>
                <Image
                  width={1920}
                  height={1080}
                  src={image}
                  alt=""
                  className="max-h-[500px] h-auto object-contain"
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <Image
          width={1920}
          height={1080}
          src={urls[0]}
          alt=""
          className="max-h-[500px] max-w-[800px] h-auto object-contain m-auto"
        />
      )}
      <IoCloseCircle
        onClick={() => dispatch(addReviewImg({ urls: [], active: 0 }))}
        className="absolute cursor-pointer top-3 right-3 size-8 text-[#00000091]"
      />
    </motion.div>
  );
}
