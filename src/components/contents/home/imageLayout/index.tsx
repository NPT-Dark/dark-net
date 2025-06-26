"use client";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addReviewImg } from "~/store/slices/reviewImgSlice";
import { FaEye } from "react-icons/fa";
export default function ImageLayout({
  images,
}: {
  images: string[];
}): React.ReactNode {
  const dispatch = useDispatch();
  function handleReviewImg(idx: number) {
    dispatch(
      addReviewImg({
        urls: images,
        active: idx,
      })
    );
  }
  const count = images.length;
  switch (count) {
    case 0:
      return null;
    case 1:
      return (
        <div className="grid grid-cols-1 gap-1 w-full  max-h-[500px]">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative group cursor-pointer"
              onClick={() => handleReviewImg(idx)}
            >
              <Image
                src={img}
                alt={`Preview ${idx}`}
                width={1920}
                height={1080}
                className="rounded-lg max-h-[500px] w-full mx-auto object-contain bg-gray-100"
              />
              <FaEye className="absolute top-0 right-0 text-2xl text-primary bg-gray-100 p-1 size-7 rounded-md opacity-0 group-hover:opacity-60 transition-all duration-300" />
            </div>
          ))}
        </div>
      );
    case 2:
      return (
        <div className="grid grid-cols-2 gap-1 w-full rounded-lg ">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-lg bg-gray-100 flex items-center justify-center group cursor-pointer"
              onClick={() => handleReviewImg(idx)}
            >
              <Image
                src={img}
                alt={`Preview ${idx}`}
                width={1920}
                height={1080}
                className="rounded-lg max-h-[500px] h-full w-full mx-auto object-cover"
              />
              <FaEye className="absolute top-0 right-0 text-2xl text-primary bg-gray-100 p-1 size-7 rounded-md opacity-0 group-hover:opacity-60 transition-all duration-300" />
            </div>
          ))}
        </div>
      );
    case 3:
      return (
        <div className="grid grid-cols-3 grid-rows-2 gap-1 w-full  h-[500px]">
          <div
            className="relative row-span-2 col-span-2 group cursor-pointer"
            onClick={() => handleReviewImg(0)}
          >
            <Image
              src={images[0]}
              alt="Preview 0"
              fill
              className="w-full h-full rounded-lg object-cover"
              style={{ objectFit: "cover" }}
            />
            <FaEye className="absolute top-0 right-0 text-2xl text-primary bg-gray-100 p-1 size-7 rounded-md opacity-0 group-hover:opacity-60 transition-all duration-300" />
          </div>

          <div
            className="relative row-span-1 col-span-1 group cursor-pointer"
            onClick={() => handleReviewImg(1)}
          >
            <Image
              src={images[1]}
              alt="Preview 1"
              fill
              className="w-full h-full rounded-lg object-cover"
              style={{ objectFit: "cover" }}
            />
            <FaEye className="absolute top-0 right-0 text-2xl text-primary bg-gray-100 p-1 size-7 rounded-md opacity-0 group-hover:opacity-60 transition-all duration-300" />
          </div>
          <div
            className="relative row-span-1 col-span-1 group cursor-pointer"
            onClick={() => handleReviewImg(2)}
          >
            <Image
              src={images[2]}
              alt="Preview 2"
              fill
              className="w-full h-full rounded-lg object-cover"
              style={{ objectFit: "cover" }}
            />
            <FaEye className="absolute top-0 right-0 text-2xl text-primary bg-gray-100 p-1 size-7 rounded-md opacity-0 group-hover:opacity-60 transition-all duration-300" />
          </div>
        </div>
      );
    case 4:
      return (
        <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full  h-[500px]">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative group cursor-pointer"
              onClick={() => handleReviewImg(idx)}
            >
              <Image
                src={img}
                alt={`Preview ${idx}`}
                width={1920}
                height={1080}
                className="w-full h-full rounded-lg object-cover"
              />
              <FaEye className="absolute top-0 right-0 text-2xl text-primary bg-gray-100 p-1 size-7 rounded-md opacity-0 group-hover:opacity-60 transition-all duration-300" />
            </div>
          ))}
        </div>
      );
    case 5:
      return (
        <div className="flex flex-col w-full gap-1">
          <div className="grid grid-cols-2 gap-1 w-full">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="relative h-[300px] group cursor-pointer"
                onClick={() => handleReviewImg(item)}
              >
                <Image
                  src={images[item]}
                  alt={`Preview ${item}`}
                  fill
                  sizes="100%"
                  className="rounded-lg object-cover"
                />
                <FaEye className="absolute top-0 right-0 text-2xl text-primary bg-gray-100 p-1 size-7 rounded-md opacity-0 group-hover:opacity-60 transition-all duration-300" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1 w-full">
            {[2, 3, 4].map((item) => (
              <div
                key={item}
                className="relative h-[200px] group cursor-pointer"
                onClick={() => handleReviewImg(item)}
              >
                <Image
                  src={images[item]}
                  alt={`Preview ${item}`}
                  fill
                  className="rounded-lg object-cover"
                />
                <FaEye className="absolute top-0 right-0 text-2xl text-primary bg-gray-100 p-1 size-7 rounded-md opacity-0 group-hover:opacity-60 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="flex flex-col w-full gap-1">
          <div className="grid grid-cols-2 gap-1 w-full">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="relative h-[300px] group cursor-pointer"
                onClick={() => handleReviewImg(item)}
              >
                <Image
                  src={images[item]}
                  alt={`Preview ${item}`}
                  fill
                  sizes="100%"
                  className="rounded-lg object-cover"
                />
                <FaEye className="absolute top-0 right-0 text-2xl text-primary bg-gray-100 p-1 size-7 rounded-md opacity-0 group-hover:opacity-60 transition-all duration-300" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1 w-full">
            {[2, 3].map((item, idx) => (
              <div
                key={idx}
                className="relative h-[200px] group cursor-pointer"
                onClick={() => handleReviewImg(item)}
              >
                <Image
                  src={images[item]}
                  alt={`Preview ${item}`}
                  fill
                  className="rounded-lg object-cover"
                />
                <FaEye className="absolute top-0 right-0 text-2xl text-primary bg-gray-100 p-1 size-7 rounded-md opacity-0 group-hover:opacity-60 transition-all duration-300" />
              </div>
            ))}
            <div className="relative h-[200px] group cursor-pointer">
              <Image
                src={images[4]}
                alt={`Preview 4`}
                fill
                className="rounded-lg object-cover"
              />
              <div
                className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg cursor-pointer"
                onClick={() => handleReviewImg(4)}
              >
                <span className="text-white text-3xl font-bold select-none">
                  +{images.length - 5}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
