"use client";
import { BiSolidImageAdd, BiSend } from "react-icons/bi";
import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";

type ImageItem = { url: string; file: File };

export default function Page(): React.ReactNode {
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

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const LayoutImageUpload = useMemo(() => {
    switch (images.length) {
      case 1:
        return (
          <div className="grid grid-cols-1 gap-1 w-full p-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <Image
                  src={img.url}
                  alt={`Preview ${idx}`}
                  width={120}
                  height={120}
                  className="w-full rounded-md object-cover h-[300px]"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  onClick={() => removeImage(idx)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-2 gap-1 w-full p-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <Image
                  src={img.url}
                  alt={`Preview ${idx}`}
                  width={120}
                  height={120}
                  className="w-full rounded-md object-cover h-[300px]"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  onClick={() => removeImage(idx)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-3 grid-rows-2 gap-1 w-full p-2 h-[300px]">
            <div className="relative row-span-2 col-span-2">
              <Image
                src={images[0].url}
                alt="Preview 0"
                fill
                className="w-full h-full rounded-md object-cover"
                style={{ objectFit: "cover" }}
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                onClick={() => removeImage(0)}
                title="Remove"
              >
                ×
              </button>
            </div>

            <div className="relative row-span-1 col-span-1">
              <Image
                src={images[1].url}
                alt="Preview 1"
                fill
                className="w-full h-full rounded-md object-cover"
                style={{ objectFit: "cover" }}
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                onClick={() => removeImage(1)}
                title="Remove"
              >
                ×
              </button>
            </div>
            <div className="relative row-span-1 col-span-1">
              <Image
                src={images[2].url}
                alt="Preview 2"
                fill
                className="w-full h-full rounded-md object-cover"
                style={{ objectFit: "cover" }}
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                onClick={() => removeImage(2)}
                title="Remove"
              >
                ×
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full p-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <Image
                  src={img.url}
                  alt={`Preview ${idx}`}
                  width={120}
                  height={120}
                  className="w-full rounded-md object-cover h-[200px]"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  onClick={() => removeImage(idx)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col w-full gap-1">
            {/* Grid 2 cột trên */}
            <div className="grid grid-cols-2 gap-1 w-full p-2 pb-0">
              {[0, 1].map((idx) => (
                <div key={idx} className="relative h-[300px]">
                  <Image
                    src={images[idx].url}
                    alt={`Preview ${idx}`}
                    fill
                    sizes="100%"
                    className="rounded-md object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    onClick={() => removeImage(idx)}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1 w-full p-2 pt-0">
              {[2, 3, 4].map((idx) => (
                <div key={idx} className="relative h-[200px]">
                  <Image
                    src={images[idx].url}
                    alt={`Preview ${idx}`}
                    fill
                    className="rounded-md object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    onClick={() => removeImage(idx)}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
        return (
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-2 grid-rows-1 gap-1 w-full p-2">
              {/* 2 hình trên */}
              <div className="relative">
                <Image
                  src={images[0].url}
                  alt="Preview 0"
                  fill
                  className="w-full h-[200px] rounded-md object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  onClick={() => removeImage(0)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
              <div className="relative">
                <div className="relative">
                  <Image
                    src={images[1].url}
                    alt="Preview 1"
                    fill
                    className="w-full h-[200px] rounded-md object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    onClick={() => removeImage(1)}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
                <div className="relative">
                  <Image
                    src={images[2].url}
                    alt="Preview 2"
                    fill
                    className="w-full h-[200px] rounded-md object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    onClick={() => removeImage(2)}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-1 gap-1 w-full p-2">
              {/* 3 hình dưới */}
              <div className="relative">
                <Image
                  src={images[3].url}
                  alt="Preview 3"
                  fill
                  className="w-full h-[200px] rounded-md object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  onClick={() => removeImage(3)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
              <div className="relative">
                <Image
                  src={images[4].url}
                  alt="Preview 4"
                  fill
                  className="w-full h-[200px] rounded-md object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  onClick={() => removeImage(4)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [images]);

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[800px]">
      <div
        className="shadow-all w-full rounded-lg dark:border dark:border-secondary"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="relative py-5 px-3 flex gap-1 w-full overflow-x-hidden">
          <textarea
            placeholder="Write something..."
            className="w-full max-w-[inherit] outline-none resize-none field-sizing-content break-words whitespace-pre-wrap"
            wrap="soft"
          />
        </div>
        {LayoutImageUpload}
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
    </div>
  );
}
