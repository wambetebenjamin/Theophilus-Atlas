import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 200, 256, 320, 384, 448],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/sites", destination: "/directory", permanent: true },
      { source: "/login", destination: "/sign-in", permanent: false },
      { source: "/insights", destination: "/atlas", permanent: true },
    ];
  },
};

export default nextConfig;
