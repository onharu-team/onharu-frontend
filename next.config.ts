import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "onharu-api.votex.co.kr",
        port: "15090",
        pathname: "/onharu-minio/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/bucket/image/**",
      },
      {
        protocol: "https",
        hostname: "minio.example.com",
        port: "",
        pathname: "/bucket/**",
      },
    ],
  },
};

export default nextConfig;
