"use client";
import React, { useRef, useState } from "react";
import { BiSend, BiSolidImageAdd } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import ImageLayout from "../imageLayout";
type ImageItem = { url: string; file: File };
export default function InputPost(): React.ReactNode {
  const [images, setImages] = useState<ImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setImages((prev) => [
            ...prev,
            { url: ev.target?.result as string, file },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setImages((prev) => [
            ...prev,
            { url: ev.target?.result as string, file },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };
  return (
    <div
      className="shadow-all w-full rounded-lg dark:shadow-none dark:border dark:border-secondary"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="relative py-5 px-3 flex gap-1 w-full overflow-x-hidden">
        <textarea
          placeholder="Write something..."
          className="w-full max-w-[inherit] text-sm outline-none resize-none field-sizing-content break-words whitespace-pre-wrap"
          wrap="soft"
        />
      </div>
      <div className="relative">
        <ImageLayout images={images.map((image) => image.url) || []} />
        {images.length > 0 ? (
          <IoCloseCircle
            onClick={() => setImages([])}
            className="absolute cursor-pointer top-1 right-1 size-8 text-[#00000091]"
          />
        ) : null}
      </div>
      <div className="w-full flex items-center justify-end px-5 pb-2 gap-3">
        <BiSolidImageAdd
          size={30}
          className="text-secondary cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <button className="bg-secondary text-white px-2 py-1 rounded-lg text-sm flex items-center gap-1">
          Post
          <BiSend />
        </button>
      </div>
    </div>
  );
}
