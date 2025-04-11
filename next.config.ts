import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ This prevents ESLint errors from breaking your Vercel build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
