import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Lets the static HTML show whether the Community event has passed as of the build.
  env: { BUILD_TIME: String(Date.now()) },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
