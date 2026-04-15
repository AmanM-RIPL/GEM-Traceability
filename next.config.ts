import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
  /* config options here */
   output: "standalone",
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),
    images: {
    qualities: [25, 75],
  },
  
  
};

export default nextConfig;
