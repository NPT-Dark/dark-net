"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

export default function ThemeControl(): React.ReactNode {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <MdDarkMode className="text-yellow-400 text-3xl" />;
  return (
    <div
      className="center-box h-full cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <MdLightMode className="text-yellow-400 text-3xl max-sm:text-xl" />
      ) : (
        <MdDarkMode className="text-yellow-400 text-3xl max-sm:text-xl" />
      )}
    </div>
  );
}
