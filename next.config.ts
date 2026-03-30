import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "onharu-api-v2.votex.co.kr",
        port: "9000",
        pathname: "/onharu-minio/**",
      },
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
      {
        protocol: "https",
        hostname: "s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
