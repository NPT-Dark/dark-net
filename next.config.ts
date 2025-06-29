import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "lh3.googleusercontent.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "platform-lookaside.fbsbx.com",
    //   },
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
