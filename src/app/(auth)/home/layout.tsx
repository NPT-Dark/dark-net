import type { Metadata } from "next";
import ChatPopup from "~/components/layouts/chatPopup";
import HeaderHome from "~/components/layouts/home/header";
import SideLeft from "~/components/layouts/home/sideLeft";
import SideRight from "~/components/layouts/home/sideRight";
import WrapperSession from "~/components/layouts/wrapperSession";
import ReviewImg from "~/components/ui/reviewImg";
import SocketProvider from "~/providers/socket";
import StoreProvider from "~/providers/store";
export const metadata: Metadata = {
  title: "Dark Net – Home",
  description:
    "Welcome to Dark Net – your smart, secure social hub powered by AI. Discover personalized content, connect meaningfully, and experience the future of online interaction with zero noise.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WrapperSession>
      <StoreProvider>
        <SocketProvider>
          <div className="relative w-full min-h-screen flex flex-col items-center justify-stretch pb-10">
            <HeaderHome />
            <div className="flex justify-between w-full mt-5 relative">
              <SideLeft />
              {children}
              <SideRight />
            </div>
          </div>
          <ReviewImg />
          <ChatPopup />
        </SocketProvider>
      </StoreProvider>
    </WrapperSession>
  );
}
