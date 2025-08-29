import React from "react";

export default function Processing(): React.ReactNode {
  return (
    <div className="size-full grid place-items-center">
      <p className="text-lg text-gray-500 animate-pulse">Đang kết nối...</p>
    </div>
  );
}
