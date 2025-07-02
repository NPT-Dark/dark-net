import { IconType } from "react-icons";
import { HiHome } from "react-icons/hi";
export const listItem: {
  label: string;
  hash: string;
  id: string;
  icon?: IconType;
}[] = [
  {
    label: "Home",
    hash: "#introduce",
    id: "introduce",
    icon: HiHome,
  },
  { label: "Features", hash: "#features", id: "features" },
  { label: "About", hash: "#about", id: "about" },
  { label: "Plans", hash: "#plans", id: "plans" },
  { label: "Contact", hash: "#contact", id: "contact" },
];
