import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  basePath: "/UpFront-Electronics", // Replace with your repository name
  assetPrefix: "/UpFront-Electronics", // Replace with your repository name
};

export default nextConfig;
