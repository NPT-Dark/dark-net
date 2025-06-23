import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dark Net – Home",
  description:
    "Welcome to Dark Net – your smart, secure social hub powered by AI. Discover personalized content, connect meaningfully, and experience the future of online interaction with zero noise.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
