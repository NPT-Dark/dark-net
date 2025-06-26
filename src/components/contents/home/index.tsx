import React from "react";
import InputPost from "./inputPost";
import ListPost from "./listPost";
export default function HomepageContent(): React.ReactNode {
  return (
    <div className="w-full flex flex-col items-center max-w-[800px] gap-3">
      <InputPost />
      <ListPost />
    </div>
  );
}
