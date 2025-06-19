import clsx from "clsx";
import Link from "next/link";
import React from "react";

export default function Item({
  icon,
  hash,
  active,
  label,
}: {
  icon?: React.ReactNode;
  id: string;
  hash: string;
  active: boolean;
  label: string;
}): React.ReactNode {
  const classItem =
    "border rounded-md transition-all duration-400 px-1 hover:border-gray-300 hover:bg-white dark:hover:bg-transparent dark:hover:border-secondary";
  const classActive = active
    ? "border-gray-300 bg-white dark:bg-transparent dark:border-secondary"
    : "border-transparent";
  const classIcon = icon ? "flex items-start gap-1" : "";
  return (
    <Link href={hash} className={clsx(classIcon, classItem, classActive)}>
      {icon}
      <label>{label}</label>
    </Link>
  );
}
