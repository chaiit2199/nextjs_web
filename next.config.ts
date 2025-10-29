import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ochakanextjs.vercel.app",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
