"use client";
import React, { useMemo, useState } from "react";
// import DropdownRadio from "./dropdown";
import { BiSolidContact } from "react-icons/bi";
import { SideRightType } from "~/types/home";
import ListChats from "./listChat";

export default function SideRight(): React.ReactNode {
  const [selectedType] = useState<SideRightType>(SideRightType.CHAT);
  const ListItemSelected = useMemo(() => {
    switch (selectedType) {
      case SideRightType.CHAT:
        return <ListChats />;
      case SideRightType.GROUP:
        return null;
      case SideRightType.RELATED_CALL:
        return null;
      default:
        return null;
    }
  }, [selectedType]);
  return (
    <>
      <div className="min-w-[350px] max-w-[350px] w-full h-[calc(100vh-150px)]" />
      <div className="flex flex-col shadow-all pb-5 overflow-hidden rounded-md items-start min-w-[350px] max-w-[350px] w-full gap-3 h-[calc(100vh-150px)] dark:shadow-none dark:border fixed right-[max(0px,calc((100vw-1920px)/2)+50px)] max-md:right-[max(0px,calc((100vw-1920px)/2)+25px)]">
        <div className="w-full h-full flex flex-col items-stretch justify-stretch gap-3">
          <div className="w-full flex items-center justify-between cursor-pointer pt-5 px-5">
            <div className="flex items-center gap-2">
              <BiSolidContact size={30} className="text-secondary" />
              Contacts
            </div>
            {/* <DropdownRadio /> */}
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto custom-scroll w-full">
            <div className="w-full flex flex-col gap-3 px-5">
              {ListItemSelected}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
