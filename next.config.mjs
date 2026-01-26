/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/UpFront-Electronics",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
