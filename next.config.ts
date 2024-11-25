import type { NextConfig } from "next";

const nextConfig: NextConfig ={
  output: 'export',
  distDir: 'build/web'  // Specify the export directory
}

export default nextConfig;
