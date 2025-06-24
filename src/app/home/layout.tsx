import type { Metadata } from "next";
import HeaderHome from "~/components/layouts/home/header";
import SideLeft from "~/components/layouts/home/sideLeft";
import SideRight from "~/components/layouts/home/sideRight";
import WrapperSession from "~/components/layouts/wrapperSession";
export const metadata: Metadata = {
  title: "Dark Net – Home",
  description:
    "Welcome to Dark Net – your smart, secure social hub powered by AI. Discover personalized content, connect meaningfully, and experience the future of online interaction with zero noise.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WrapperSession>
      <div className="relative w-full min-h-screen flex flex-col items-center justify-stretch">
        <HeaderHome />
        <div className="flex justify-between w-full mt-5">
          <SideLeft />
          {children}
          <SideRight />
        </div>
      </div>
    </WrapperSession>
  );
}
