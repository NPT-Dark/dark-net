import { IoIosCall } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { IconType } from "react-icons";

export const dataCoreValue: { label: string; image: string; icon: IconType }[] =
  [
    {
      label: "Online Call",
      image: "banner-1.webp",
      icon: IoIosCall,
    },
    {
      label: "Security",
      image: "banner-2.webp",
      icon: MdOutlineSecurity,
    },
    {
      label: "AI Chat",
      image: "banner-3.webp",
      icon: RiRobot2Fill,
    },
    {
      label: "Social",
      image: "banner-4.webp",
      icon: IoPeopleCircleSharp,
    },
  ];
